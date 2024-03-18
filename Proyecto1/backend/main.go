package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os/exec"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Process struct {
	Pid        int       `json:"pid"`
	Name       string    `json:"name"`
	User       int       `json:"user"`
	State      int       `json:"state"`
	Ram        int       `json:"ram"`
	PidPadre   int       `json:"pidPadre"`
	CpuTotal   int       `json:"cpu_total"`
	Porcentaje int       `json:"cpu_porcentaje"`
	Child      []Process `json:"child"` // Campo para procesos hijos
}

type CpuUsage struct {
	CpuTotal   int `json:"cpu_total"`
	Porcentaje int `json:"cpu_porcentaje"`
}

type RamUsage struct {
	Used int64 `json:"used"`
	Free int64 `json:"free"`
}

func main() {
	// Inicializa la conexión con la base de datos
	db, err := sql.Open("mysql", "admin:password@tcp(mydb:3306)/db_so1py1")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Configura el temporizador para ejecutar cada 500 milisegundos
	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	// Ejecuta una consulta SQL para crear la tabla tabla_ram_usage si no existe
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS tabla_ram_usage (
			id INT AUTO_INCREMENT PRIMARY KEY,
			used BIGINT,
			free BIGINT
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	// Ejecuta una consulta SQL para crear la tabla tabla_cpu_usage si no existe
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS tabla_cpu_usage (
			id INT AUTO_INCREMENT PRIMARY KEY,
			cpu_used FLOAT,
			cpu_free FLOAT
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	// Ejecuta una consulta SQL para crear la tabla tabla_procesos si no existe
	_, err = db.Exec(`

		CREATE TABLE IF NOT EXISTS tabla_procesos (
			id INT AUTO_INCREMENT PRIMARY KEY,
			pid INT NOT NULL,
			name VARCHAR(255),
			user INT,
			state INT,
			ram INT,
			pidPadre INT,
			cpu_total INT,
			cpu_porcentaje INT
		)
	`)

	if err != nil {
		log.Fatal(err)
	}

	// Define un bucle infinito para ejecutar la inserción en la base de datos cada 500 milisegundos
	go func() {
		for {
			select {
			case <-ticker.C:
				if err := saveRamUsage(db); err != nil {
					log.Println("Error al guardar el uso de RAM:", err)
				}

				if err := saveCpuUsage(db); err != nil {
					log.Println("Error al guardar el uso de CPU:", err)
				}

			}
		}
	}()

	// Configura el manejador de la API
	http.HandleFunc("/ram-usage", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		ramUsage, err := getRamUsage()
		if err != nil {
			http.Error(w, "Error al obtener el uso de RAM", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(ramUsage)
	})

	// Configura el manejador de la API para consultar el uso de CPU
	http.HandleFunc("/cpu-usage", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		cpu_Used, cpu_Free, err := getCpuUsage()
		if err != nil {
			http.Error(w, "Error al obtener el uso de CPU", http.StatusInternalServerError)
			return
		}

		cpuUsage := map[string]float64{"cpu_free": cpu_Free, "cpu_used": cpu_Used}
		json.NewEncoder(w).Encode(cpuUsage)
	})

	// Configura el manejador de la API para consultar los procesos
	http.HandleFunc("/process-data", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		_, err = db.Exec(`

			TRUNCATE TABLE tabla_procesos
		`)

		saveProcessData(db)

		processData, err := getSelectAll_ProcessData(db)
		if err != nil {
			http.Error(w, "Error al obtener los datos del proceso", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(processData)
	})

	// Inicia el servidor
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func saveRamUsage(db *sql.DB) error {
	// Llama a la función getRamUsage y obtiene los datos
	ramUsageJSON, err := getRamUsage()
	if err != nil {
		return err
	}

	// Parsea la salida JSON
	var ramUsageData map[string]interface{}
	err = json.Unmarshal([]byte(ramUsageJSON), &ramUsageData)
	if err != nil {
		return err
	}

	// Inserta los datos en la base de datos
	_, err = db.Exec("INSERT INTO tabla_ram_usage (used, free) VALUES (?, ?)",
		ramUsageData["used"], ramUsageData["free"])
	if err != nil {
		return err
	}

	return nil
}

func getRamUsage() (string, error) {
	// Ejecuta los comandos en una sesión de bash
	cmd := exec.Command("sh", "-c", "cat /proc/ram_so1_1s2024")

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func saveCpuUsage(db *sql.DB) error {
	// Llama a la función getCpuUsage y obtiene los datos
	cpu_Used, cpu_Free, err := getCpuUsage()
	if err != nil {
		return err
	}

	// Inserta los datos en la base de datos
	_, err = db.Exec("INSERT INTO tabla_cpu_usage (cpu_used, cpu_free) VALUES (?, ?)", cpu_Free, cpu_Used)
	if err != nil {
		return err
	}

	return nil
}

func getCpuUsage() (float64, float64, error) {
	// Ejecuta el comando mpstat en una sesión de bash
	cmd := exec.Command("sh", "-c", "mpstat")

	output, err := cmd.CombinedOutput()
	if err != nil {
		return 0, 0, err
	}

	// Analiza la salida para extraer los datos de la utilización de la CPU
	lines := strings.Split(string(output), "\n")
	if len(lines) < 4 {
		return 0, 0, errors.New("mpstat output format not recognized")
	}

	fields := strings.Fields(lines[3])
	if len(fields) < 12 {
		return 0, 0, errors.New("mpstat output format not recognized")
	}

	// Calcula el porcentaje de CPU en uso restando el porcentaje de CPU idle del 100%
	cpu_Free, _ := strconv.ParseFloat(fields[11], 64)
	cpu_Used := 100.0 - cpu_Free

	// Redondea a 2 decimales
	cpu_Used = float64(int(cpu_Used*100)) / 100
	cpu_Free = float64(int(cpu_Free*100)) / 100

	return cpu_Used, cpu_Free, nil
}

func saveProcessData(db *sql.DB) error {
	// Leer el contenido del archivo cpu_so1_1s2024
	data, err := getProcessData()
	if err != nil {
		return err
	}

	// Parsear el contenido JSON
	var cpuData struct {
		CpuTotal      int       `json:"cpu_total"`
		CpuPorcentaje int       `json:"cpu_porcentaje"`
		Processes     []Process `json:"processes"`
	}
	err = json.Unmarshal([]byte(data), &cpuData)
	if err != nil {
		return err
	}

	// Insertar los datos de los procesos padres en la base de datos
	for _, process := range cpuData.Processes {
		if process.PidPadre == 0 {
			// Es un proceso padre, insertarlo en la base de datos
			err := insertProcess(db, process)
			if err != nil {
				return err
			}
		}
	}

	// Insertar los datos de los procesos hijos en la base de datos
	for _, process := range cpuData.Processes {
		for _, child := range process.Child {
			err := insertProcess(db, child)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func insertProcess(db *sql.DB, process Process) error {
	_, err := db.Exec("INSERT INTO tabla_procesos (pid, name, user, state, ram, pidPadre, cpu_total, cpu_porcentaje) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		process.Pid, process.Name, process.User, process.State, process.Ram, process.PidPadre, process.CpuTotal, process.Porcentaje)
	if err != nil {
		return err
	}
	return nil
}

func getProcessData() (string, error) {
	// Ejecuta los comandos en una sesión de bash
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_so1_1s2024")

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func getSelectAll_ProcessData(db *sql.DB) ([]Process, error) {
	// Realizar una consulta SQL para obtener todos los registros de la tabla tabla_procesos
	rows, err := db.Query("SELECT * FROM tabla_procesos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Iterar sobre los registros y guardarlos en un slice
	var results []Process
	for rows.Next() {
		var process Process
		err = rows.Scan(&process.Pid, &process.Name, &process.User, &process.State, &process.Ram, &process.PidPadre, &process.CpuTotal, &process.Porcentaje)
		if err != nil {
			return nil, err
		}
		results = append(results, process)
	}

	return results, nil
}

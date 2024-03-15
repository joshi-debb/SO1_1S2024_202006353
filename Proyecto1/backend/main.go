package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Process struct {
	Pid        int    `json:"pid"`
	Name       string `json:"name"`
	User       int    `json:"user"`
	State      int    `json:"state"`
	Ram        int    `json:"ram"`
	PidPadre   int    `json:"pidPadre"`
	CpuTotal   int    `json:"cpu_total"`
	Porcentaje int    `json:"cpu_porcentaje"`
}

type RamUsage struct {
	Total   int64 `json:"total"`
	Used    int64 `json:"used"`
	Percent int   `json:"percent"`
	Free    int64 `json:"free"`
}

func main() {
	// Inicializa la conexión con la base de datos
	db, err := sql.Open("mysql", "admin:password@tcp(127.0.0.1:3306)/dbso1py1")
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
			total BIGINT,
			used BIGINT,
			percent INT,
			free BIGINT
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	//fmt.Println("La tabla tabla_ram_usage ha sido creada correctamente.")

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
			cpu_porcentaje INT,
			PRIMARY KEY (pid)
		);
	`)

	if err != nil {
		log.Fatal(err)
	}

	//fmt.Println("La tabla tabla_procesos ha sido creada correctamente.")

	// Define un bucle infinito para ejecutar la inserción en la base de datos cada 500 milisegundos
	go func() {
		for {
			select {
			case <-ticker.C:
				if err := saveRamUsage(db); err != nil {
					log.Println("Error al guardar el uso de RAM:", err)
				}

				if err := saveProcessData(db); err != nil {
					log.Println("Error al guardar los datos de los procesos:", err)
				}

			}
		}
	}()

	// Configura el manejador de la API
	http.HandleFunc("/process-data", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		processData, err := getSelectAll_ProcessData(db)
		if err != nil {
			http.Error(w, "Error al obtener los datos del proceso", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(processData)
	})

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

	http.HandleFunc("/clear-db", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		// Obtiene el nombre de la tabla de los parámetros de la solicitud
		tableName := r.URL.Query().Get("table")

		// Verifica si se proporcionó un nombre de tabla válido
		if tableName == "" {
			http.Error(w, "Debe proporcionar el nombre de la tabla a limpiar", http.StatusBadRequest)
			return
		}

		// Intenta limpiar la base de datos con el nombre de tabla proporcionado
		err := clearDB(db, tableName)
		if err != nil {
			http.Error(w, "Error al limpiar la base de datos", http.StatusInternalServerError)
			return
		}

		// Envía una respuesta de éxito si no hay errores
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(fmt.Sprintf("La tabla %s ha sido limpiada correctamente", tableName)))
	})

	http.HandleFunc("/select-all", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		results, err := getSelectAll_RAM(db)
		if err != nil {
			http.Error(w, "Error al obtener el uso de RAM", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(results)
	})

	// Inicia el servidor
	log.Fatal(http.ListenAndServe(":8000", nil))
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
	_, err = db.Exec("INSERT INTO tabla_ram_usage (total, used, percent, free) VALUES (?, ?, ?, ?)",
		ramUsageData["total"], ramUsageData["used"], ramUsageData["percent"], ramUsageData["free"])
	if err != nil {
		return err
	}

	return nil
}

func saveProcessData(db *sql.DB) error {
	// Limpiar la tabla tabla_procesos
	if err := clearDB(db, "tabla_procesos"); err != nil {
		return err
	}

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

	// Insertar los datos en la base de datos
	for _, process := range cpuData.Processes {
		_, err := db.Exec("INSERT INTO tabla_procesos (pid, name, user, state, ram, pidPadre, cpu_total, cpu_porcentaje) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			process.Pid, process.Name, process.User, process.State, process.Ram, process.PidPadre, cpuData.CpuTotal, cpuData.CpuPorcentaje)
		if err != nil {
			log.Println("Error al insertar proceso:", err)
		}
	}

	return nil
}

func getProcessData() (string, error) {
	// Ejecuta los comandos en una sesión de bash
	cmd := exec.Command("bash", "-c", "cd /home/why && cd /proc && cat cpu_so1_1s2024")

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func getRamUsage() (string, error) {
	// Ejecuta los comandos en una sesión de bash
	cmd := exec.Command("bash", "-c", "cd /home/why && cd /proc && cat ram_so1_1s2024")

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func getRamUsageFromDB(db *sql.DB) (RamUsage, error) {
	var ramUsage RamUsage
	err := db.QueryRow("SELECT total, used, percent, free FROM tabla_ram_usage ORDER BY id DESC LIMIT 1").Scan(&ramUsage.Total, &ramUsage.Used, &ramUsage.Percent, &ramUsage.Free)
	if err != nil {
		return RamUsage{}, err
	}
	return ramUsage, nil
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

func clearDB(db *sql.DB, tableName string) error {
	// Ejecuta la consulta para eliminar todos los registros de la tabla especificada
	_, err := db.Exec(fmt.Sprintf("DELETE FROM %s", tableName))
	if err != nil {
		return err
	}

	return nil
}

func getSelectAll_RAM(db *sql.DB) ([]string, error) {
	// Realiza una consulta SQL para obtener todos los registros de la tabla tabla_ram_usage
	rows, err := db.Query("SELECT * FROM tabla_ram_usage")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Iterar sobre los registros y guardarlos en un slice
	var results []string
	for rows.Next() {
		var id, total, used, percent, free int
		err = rows.Scan(&id, &total, &used, &percent, &free)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, fmt.Sprintf("id: %d,total: %d, used: %d, percent: %d, free: %d", id, total, used, percent, free))
	}

	return results, nil

}

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Process struct {
	Pid      int       `json:"pid"`
	Name     string    `json:"name"`
	PidPadre int       `json:"pidPadre"`
	Child    []Process `json:"child"`
}

type CpuUsage struct {
	Id_cpu   int     `json:"Id_cpu"`
	CpuUsage float64 `json:"CpuUsage"`
	Time     string  `json:"Time"`
}

type RamUsage struct {
	Id_ram  int    `json:"Id_ram"`
	RamUsed int64  `json:"RamUsed"`
	RamFree int64  `json:"RamFree"`
	Time    string `json:"Time"`
}

type Payload struct {
	Pid string `json:"pid"`
}

var lista_global []string

func main() {

	// Conecta a la base de datos
	db, err := sql.Open("mysql", "admin:password@tcp(mydb:3306)/db_so1py1")
	//db, err := sql.Open("mysql", "admin:password@tcp(127.0.0.1:3306)/dbso1py1")
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
			ramUsed BIGINT,
			ramFree BIGINT
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	// Ejecuta una consulta SQL para crear la tabla tabla_cpu_usage si no existe
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS tabla_cpu_usage (
			id INT AUTO_INCREMENT PRIMARY KEY,
			cpuUsed FLOAT,
			cpuFree FLOAT
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
			pidPadre INT
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

		cpuUsage, err := getCpuUsage()
		if err != nil {
			http.Error(w, "Error al obtener el uso del CPU", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(cpuUsage)
	})

	// Configura el manejador de la API para consultar los procesos
	http.HandleFunc("/get-pid", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		lista_global, err := postProcessData()
		if err != nil {
			http.Error(w, "Error al obtener el uso del CPU", http.StatusInternalServerError)
			return
		}

		var lista []Payload

		for _, nombre := range lista_global {
			pids := Payload{Pid: nombre}
			lista = append(lista, pids)
		}

		jsonLista, _ := json.Marshal(lista)

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonLista)
	})

	http.HandleFunc("/get-image", func(w http.ResponseWriter, r *http.Request) {
		// Permite solicitudes desde cualquier origen
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		decoder := json.NewDecoder(r.Body)
		var payload Payload
		err := decoder.Decode(&payload)
		if err != nil {
			http.Error(w, "Error al obtener el nombre", http.StatusInternalServerError)
			return
		}

		fmt.Println(payload.Pid)

		imagen := string(payload.Pid)
		lista, err := saveProcessData()
		for _, nombre := range lista {
			if nombre == imagen {
				file, err := os.Open("trees/" + imagen + ".png")
				if err != nil {
					http.Error(w, "Error al obtener la imagen", http.StatusInternalServerError)
					return
				}
				defer file.Close()

				contenido, err := ioutil.ReadAll(file)
				if err != nil {
					http.Error(w, "Error al leer la imagen", http.StatusInternalServerError)
					return
				}

				lista_global = nil

				w.Header().Set("Content-Type", "image/png")
				w.Write(contenido)
			}
		}
		if err != nil {
			http.Error(w, "Error al obtener la imagen", http.StatusInternalServerError)
			return
		}

	})

	http.HandleFunc("/start", StartProcess)
	http.HandleFunc("/stop", StopProcess)
	http.HandleFunc("/resume", ResumeProcess)
	http.HandleFunc("/kill", KillProcess)

	// Inicia el servidor
	//log.Fatal(http.ListenAndServe(":8000", nil))
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
	_, err = db.Exec("INSERT INTO tabla_ram_usage (ramUsed, ramFree) VALUES (?, ?)",
		ramUsageData["used"], ramUsageData["free"])
	if err != nil {
		return err
	}

	return nil
}

func saveCpuUsage(db *sql.DB) error {
	// Llama a la función getRamUsage y obtiene los datos
	cpuUsageJSON, err := getCpuUsage()
	if err != nil {
		return err
	}

	// Parsea la salida JSON
	var cpuUsageData map[string]interface{}
	err = json.Unmarshal([]byte(cpuUsageJSON), &cpuUsageData)
	if err != nil {
		return err
	}

	// Convert the value to float64 before performing the subtraction
	cpuUsage := cpuUsageData["cpu_usage"].(float64)
	cpuFree := 1 - cpuUsage

	// Insert the data into the database
	_, err = db.Exec("INSERT INTO tabla_cpu_usage (cpuUsed, cpuFree) VALUES (?, ?)",
		cpuUsage, cpuFree)
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

func getCpuUsage() (string, error) {
	// Ejecuta los comandos en una sesión de bash
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_so1_1s2024")

	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func graficar_hijos(process Process, dotsrc *string) {

	for _, child := range process.Child {
		*dotsrc += " " + fmt.Sprint(child.Pid) + "[label=\"" + child.Name + "\n" + fmt.Sprint(child.Pid) + "\"]"
		*dotsrc += fmt.Sprint(process.Pid) + " -> " + fmt.Sprint(child.Pid)
		if len(child.Child) > 0 {
			graficar_hijos(child, dotsrc)
		}
	}
}

func saveProcessData() ([]string, error) {
	// Leer el contenido del archivo cpu_so1_1s2024
	data, err := getProcessData()
	if err != nil {
		return nil, err
	}

	// Parsear el contenido JSON
	var cpuData struct {
		Processes []Process `json:"processes"`
	}
	err = json.Unmarshal([]byte(data), &cpuData)
	if err != nil {
		return nil, err
	}

	// Insertar los datos de los procesos padres en la base de datos
	for _, process := range cpuData.Processes {
		if process.PidPadre == 0 {
			lista_global = append(lista_global, fmt.Sprint(process.Pid))
			dotsrc := "digraph G {"
			//graficaramos el proceso
			dotsrc += " " + fmt.Sprint(process.Pid) + " [label=\"" + process.Name + "\n" + fmt.Sprint(process.Pid) + "\"]"

			graficar_hijos(process, &dotsrc)

			dotsrc += "}"
			// fmt.Println(dotsrc)

			nombre := fmt.Sprint(process.Pid) + ".dot"
			ruta := "trees/" + nombre

			err := ioutil.WriteFile(ruta, []byte(dotsrc), 0644)
			if err != nil {
				fmt.Println(err)
			}
			nombreimg := fmt.Sprint(process.Pid) + ".png"
			rutaimg := "trees/" + nombreimg

			cmd := exec.Command("dot", "-Tpng", ruta, "-o", rutaimg)
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}
		}
	}

	return lista_global, nil
}

func postProcessData() ([]string, error) {
	// Leer el contenido del archivo cpu_so1_1s2024
	data, err := getProcessData()
	if err != nil {
		return nil, err
	}

	// Parsear el contenido JSON
	var cpuData struct {
		Processes []Process `json:"processes"`
	}
	err = json.Unmarshal([]byte(data), &cpuData)
	if err != nil {
		return nil, err
	}

	var lista []string

	// Insertar los datos de los procesos padres en la base de datos
	for _, process := range cpuData.Processes {
		if process.PidPadre == 0 {
			lista = append(lista, fmt.Sprint(process.Pid))
		}
	}

	return lista, nil
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

func StartProcess(w http.ResponseWriter, r *http.Request) {

	//allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")

	// Crear un nuevo proceso con un comando de espera
	cmd := exec.Command("sleep", "infinity")
	err := cmd.Start()
	if err != nil {
		fmt.Print(err)
		http.Error(w, "Error al iniciar el proceso", http.StatusInternalServerError)
		return
	}

	// Obtener el comando con PID
	process := cmd

	fmt.Fprintf(w, `{"pid":%d}`, process.Process.Pid)
}

func StopProcess(w http.ResponseWriter, r *http.Request) {

	//allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")

	pidStr := r.URL.Query().Get("pid")
	if pidStr == "" {
		http.Error(w, "Se requiere el parámetro 'pid'", http.StatusBadRequest)
		return
	}

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "El parámetro 'pid' debe ser un número entero", http.StatusBadRequest)
		return
	}

	// Enviar señal SIGSTOP al proceso con el PID proporcionado
	cmd := exec.Command("kill", "-SIGSTOP", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al detener el proceso con PID %d", pid), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, `{"mensaje":"Proceso con PID %d detenido"}`, pid)
}

func ResumeProcess(w http.ResponseWriter, r *http.Request) {

	//allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")

	pidStr := r.URL.Query().Get("pid")
	if pidStr == "" {
		http.Error(w, "Se requiere el parámetro 'pid'", http.StatusBadRequest)
		return
	}

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "El parámetro 'pid' debe ser un número entero", http.StatusBadRequest)
		return
	}

	// Enviar señal SIGCONT al proceso con el PID proporcionado
	cmd := exec.Command("kill", "-SIGCONT", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al reanudar el proceso con PID %d", pid), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, `{"mensaje":"Proceso con PID %d reanudado"}`, pid)
}

func KillProcess(w http.ResponseWriter, r *http.Request) {

	//allow CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")

	pidStr := r.URL.Query().Get("pid")
	if pidStr == "" {
		http.Error(w, "Se requiere el parámetro 'pid'", http.StatusBadRequest)
		return
	}

	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "El parámetro 'pid' debe ser un número entero", http.StatusBadRequest)
		return
	}

	// Enviar señal SIGCONT al proceso con el PID proporcionado
	cmd := exec.Command("kill", "-9", strconv.Itoa(pid))
	err = cmd.Run()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al intentar terminar el proceso con PID %d", pid), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, `{"mensaje":"Proceso con PID %d ha terminado"}`, pid)
}

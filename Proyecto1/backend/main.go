package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os/exec"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// // Inicializa el enrutador
	// r := mux.NewRouter()

	// Conecta con la base de datos
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

	fmt.Println("La tabla tabla_ram_usage ha sido creada correctamente.")

	// Define un bucle infinito para ejecutar la inserción en la base de datos cada 500 milisegundos
	for {
		select {
		case <-ticker.C:

			// Llamar a la función getRamUsage y obtener los datos
			ramUsageJSON, err := getRamUsage()
			if err != nil {
				log.Fatal(err)
			}

			// Parsear la salida JSON
			var ramUsageData map[string]interface{}
			err = json.Unmarshal([]byte(ramUsageJSON), &ramUsageData)
			if err != nil {
				log.Fatal(err)
			}

			// Insertar los datos en la base de datos
			_, err = db.Exec("INSERT INTO tabla_ram_usage (total, used, percent, free) VALUES (?, ?, ?, ?)",
				ramUsageData["total"], ramUsageData["used"], ramUsageData["percent"], ramUsageData["free"])
			if err != nil {
				log.Fatal(err)
			}

			// Llamar a la función getSelectAll y obtener los datos
			selectAllData, err := getSelectAll()
			if err != nil {
				log.Fatal(err)
			}

			fmt.Println("Datos obtenidos de la base de datos:")
			// Imprimir los datos obtenidos
			for _, data := range selectAllData {
				fmt.Println(data)
			}

		}
	}
	// // Inicia el servidor
	// log.Fatal(http.ListenAndServe(":8000", r))
}

func getRamUsage() (string, error) {
	// Ejecutar los comandos en una sesión de bash
	cmd := exec.Command("bash", "-c", "cd /home/why && cd /proc && cat ram_so1_1s2024")

	output, err := cmd.CombinedOutput()

	fmt.Println(string(output))

	if err != nil {
		log.Fatalf("error running command: %s", err)
		return "", err
	}

	//ejemplo de la salida del comando
	//{"total":16070242304, "used":6189203456, "percent":38, "free":9881038848 }

	return string(output), nil

}

func getSelectAll() ([]string, error) {
	// Conecta con la base de datos
	db, err := sql.Open("mysql", "admin:password@tcp(127.0.0.1:3306)/dbso1py1")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

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

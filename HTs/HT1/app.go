package main

import (
	"context"
	"fmt"
	"log"
	"os/exec"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Cmds ejecuta los comandos especificados en secuencia
func (a *App) Cmds() (string, error) {
	// Ejecutar los comandos en una sesión de bash
	cmd := exec.Command("bash", "-c", "cd /home/why && cd /proc && cat ram_202006353")

	output, err := cmd.CombinedOutput()

	fmt.Println(string(output))

	if err != nil {
		log.Fatalf("error running command: %s", err)
		return "", err
	}

	return string(output), nil
}

package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    // Agregar el middleware CORS
    app.Use(middlewareCors)

    app.Options("/*", func(c *fiber.Ctx) error {
        // Configurar encabezados para las solicitudes OPTIONS
        c.Set("Access-Control-Allow-Origin", "*")
        c.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
        c.Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,Access-Control-Allow-Origin")
        c.Set("Access-Control-Allow-Credentials", "true")

        // Respondemos OK (200) para solicitudes OPTIONS
        return c.SendStatus(fiber.StatusOK)
    })

    app.Get("/data", func(c *fiber.Ctx) error {
        // Crear un mapa para representar la respuesta en formato JSON
        response := map[string]string{"message": "Josue Zuleta - 202006353"}

        // Retornar la respuesta en formato JSON
        return c.JSON(response)
    })

    app.Listen(":8080")
}

func middlewareCors(c *fiber.Ctx) error {
    c.Set("Access-Control-Allow-Origin", "*")
    c.Set("Access-Control-Allow-Credentials", "true")
    c.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    c.Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,Access-Control-Allow-Origin")
    c.Set("Access-Control-Expose-Headers", "Content-Type")

    // Permitir que continúe con el siguiente middleware/handler
    return c.Next()
}
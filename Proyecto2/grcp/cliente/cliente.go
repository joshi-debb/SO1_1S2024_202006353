package main

import (
	"context"
	"fmt"
	"log"

	pb "cliente/proto"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
)

var ctx = context.Background()

type Data struct {
	Name  string
	Album string
	Year  string
	Rank  string
}

func insertData(c *fiber.Ctx) error {
	var data map[string]string
	e := c.BodyParser(&data)
	if e != nil {
		return e
	}

	band := Data{
		Name:  data["name"],
		Album: data["album"],
		Year:  data["year"],
		Rank:  data["rank"],
	}

	// Enviar datos al servidor gRPC
	go sendServer(band)
	return nil
}

func sendServer(band Data) {
	conn, err := grpc.Dial("localhost:3001", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalln(err)
	}
	defer conn.Close()

	cl := pb.NewGetInfoClient(conn)

	_, err = cl.ReturnInfo(ctx, &pb.RequestId{
		Name:  band.Name,
		Album: band.Album,
		Year:  band.Year,
		Rank:  band.Rank,
	})
	if err != nil {
		log.Fatalln(err)
	}

	// Registro de mensaje en el cliente
	fmt.Println("Datos enviados al servidor:", band)
}

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"res": "todo bien",
		})
	})

	app.Post("/grpc/insert", insertData)

	err := app.Listen(":3000")
	if err != nil {
		return
	}
}

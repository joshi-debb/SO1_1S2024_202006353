package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"time"

	"github.com/go-redis/redis/v8"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	pb "serverGRPC/proto"

	"google.golang.org/grpc"
)

var ctx = context.Background()
var db *mongo.Database
var rdb *redis.Client

type server struct {
	pb.UnimplementedGetInfoServer
}

const (
	port              = ":3001"
	mongoDBURI        = "mongodb://34.41.68.81:27017"
	mongoDBName       = "so1py2"
	mongoDBCollection = "bands"
	redisAddress      = "34.136.173.161:6379"
)

type Data struct {
	Name  string
	Album string
	Year  string
	Rank  string
}

type Log struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Message   string
	Data      Data
	Timestamp time.Time
}

func mongoConnect() {
	clientOptions := options.Client().ApplyURI(mongoDBURI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	db = client.Database(mongoDBName)
	fmt.Println("Conexión a MongoDB exitosa")
}

func redisConnect() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     redisAddress,
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Conexión a Redis exitosa:", pong)
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	fmt.Println("Recibí de cliente: ", in.GetName())
	data := Data{
		Name:  in.GetName(),
		Album: in.GetAlbum(),
		Year:  in.GetYear(),
		Rank:  in.GetRank(),
	}
	fmt.Println(data)
	// Insertar el mensaje en MongoDB con fecha y hora
	insertMongoDB(Log{
		Message:   "Dato recibido",
		Data:      data,
		Timestamp: time.Now(), // Obtener la hora actual
	})

	// Insertar los datos en Redis
	insertRedis(data)

	return &pb.ReplyInfo{Info: "Hola cliente, recibí el comentario"}, nil
}

func insertMongoDB(log Log) {
	collection := db.Collection(mongoDBCollection)

	_, err := collection.InsertOne(ctx, log)
	if err != nil {
		fmt.Println("Error al insertar en MongoDB:", err)
	}
}

func insertRedis(data Data) {
	// Almacenar el valor en Redis
	result, err := rdb.HIncrBy(ctx, "data", data.Name, 1).Result()
	if err != nil {
		fmt.Println("Error al insertar en Redis:", err)
		return
	}
	fmt.Println("Valor almacenado en Redis:", result)
}

func main() {
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})

	mongoConnect()
	redisConnect()

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}
}

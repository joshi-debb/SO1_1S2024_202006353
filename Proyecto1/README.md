### PROYECTO 1
#### SYSTEM MONITOR

# Explicación del Código

## Descripción General
El código proporcionado es una implementación de un servidor HTTP en Go (Golang) que actúa como una API para monitorear y controlar el sistema. La API expone endpoints para consultar y manipular el uso de CPU, RAM, procesos en ejecución, así como iniciar, detener, reanudar y matar procesos específicos.

## Estructura del Código
El código consta de varias secciones principales:

1. **Importaciones**: Se importan los paquetes necesarios, incluyendo `database/sql` para interactuar con la base de datos MySQL, y `net/http` para el servidor HTTP.
   
2. **Definición de Estructuras**: Se definen las estructuras `Process`, `CpuUsage`, `RamUsage`, y `Payload` para representar los datos de procesos, uso de CPU, uso de RAM y datos de carga, respectivamente.

3. **Variables Globales**: Se define una variable global `lista_global` para almacenar información sobre los procesos.

4. **Función `main()`**: La función principal del programa, donde se realiza la configuración del servidor HTTP, se establece la conexión con la base de datos, se crea y se inicia un temporizador para recopilar datos periódicamente, y se configuran los manejadores de los endpoints de la API.

5. **Funciones Auxiliares**: Se definen varias funciones auxiliares para realizar operaciones como guardar el uso de RAM y CPU en la base de datos, obtener el uso de RAM y CPU del sistema, graficar procesos y manipular procesos del sistema.

6. **Manejadores de Endpoints**: Se definen los manejadores de los diferentes endpoints de la API, como obtener el uso de RAM y CPU, consultar procesos, iniciar, detener, reanudar y matar procesos.

## Puntos Destacados
Algunos puntos destacados del código son:

- **Interacción con la Base de Datos**: Se utiliza la biblioteca `database/sql` para interactuar con una base de datos MySQL, donde se almacenan los datos de uso de RAM y CPU.

- **Recopilación Periódica de Datos**: Se utiliza un temporizador para recopilar periódicamente datos de uso de RAM y CPU y guardarlos en la base de datos.

- **Manipulación de Procesos**: Se implementan funciones para iniciar, detener, reanudar y matar procesos específicos del sistema operativo.

- **Graficación de Procesos**: Se generan archivos DOT y PNG para representar gráficamente los procesos del sistema.

## Uso de la API
Para utilizar la API, se pueden enviar solicitudes HTTP a los endpoints definidos, como `/ram-usage`, `/cpu-usage`, `/get-pid`, `/start`, `/stop`, `/resume` y `/kill`, según sea necesario para monitorear y controlar el sistema.

## Notas de Seguridad
Es importante tener en cuenta que este código expone endpoints que pueden interactuar con el sistema operativo y la base de datos. Se deben tomar medidas de seguridad adecuadas, como la autenticación y la validación de entrada, para proteger contra posibles vulnerabilidades y ataques.

## Dependencias
El código utiliza las siguientes dependencias:

- `github.com/go-sql-driver/mysql`: Para interactuar con la base de datos MySQL.

## DockerFile

- dockerfile (backend)

        FROM golang:1.22.1

        WORKDIR /backend

        COPY . ./

        RUN go build -o main .

        EXPOSE 8080

        CMD [ "./main" ]


- dockerfile (frontend)

        # Etapa de construcción
        FROM node:16 AS build

        WORKDIR /app

        COPY package.json ./
        COPY package-lock.json ./

        RUN npm install

        COPY . ./

        RUN npm run build

        # Etapa de producción
        FROM nginx:stable-alpine

        # Copia los archivos de la etapa de construcción al directorio de Nginx
        COPY --from=build /app/build /usr/share/nginx/html
        COPY nginx.conf /etc/nginx/nginx.conf

        # Exponer el puerto 80
        EXPOSE 80

        # Comando por defecto para iniciar Nginx
        CMD ["nginx", "-g", "daemon off;"]

- docker-compose

        version: '3'

        services:
        mydb:
        image: mysql:latest
        restart: always
        environment:
        MYSQL_ROOT_PASSWORD: MyPass123
        MYSQL_DATABASE: db_so1py1
        MYSQL_USER: admin
        MYSQL_PASSWORD: password
        ports:
        - "3306:3306"
        volumes:
        - mydb_data:/var/lib/mysql
        networks:
        - mynet

        api:
        build: "./backend"
        image: 'bekinggo/proyecto1-api'
        # container_name: 'backend_so1py1'
        restart: always
        ports:
        - "8080:8080"
        depends_on:
        - mydb
        links:
        - mydb
        networks:
        - mynet


        front:
        build: "./frontend"
        image: 'bekinggo/proyecto1-front'
        # container_name: 'frontend_so1py1'
        ports:
        - "80:80"
        restart: always
        depends_on:
        - api
        networks:
        - mynet


        volumes:
        mydb_data:
        external: false
        
        networks:
        mynet:
        external: true


## Comandos Utilizados

- Compilar docker compose

        sudo docker-compose up -d

- Dar de baja al docker compose

        sudo docker-compose down

- Define la Red Externa

        sudo docker network create mynet

- Purgar datos de Docker

        sudo system prune -a

- Conectarse a la base de datos

        mysql -h 127.0.0.1 -u admin -p password

- Detener el servicio actual de Mysql

        sudo service mysql stop

- Crear subir contenedores a docker hub

        sudo docker tag <contenedor> <user>/<contenedor>
        sudo docker push <user>/<contenedor>


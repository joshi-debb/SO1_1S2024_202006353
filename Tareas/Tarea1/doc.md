### Documentacion Tarea #1

- Docker file backend:

Se construyo el Dockerfile para almacenar el contenido del backend en un contenedor de docker.

<img src="./screens/df_backend.png"/>


Se realizo el build del contenedor del backend con el comando:

docker build -t bekinggo/backend .

<img src="./screens/build_1.png"/>


Se realizo el push del contendor hacia Docker Hub con el siguiente comando:

docker push bekinggo/backend

Se realizo el run del contenedor con el siguiente comando:

docker run --rm -it -p 8080:8080 bekinggo/backend

<img src="./screens/push_run_1.png"/>


- Docker file frontend:

Se construyo el Dockerfile para almacenar el contenido del frontend en un contenedor de docker.

<img src="./screens/df_frontend.png"/>


Se realizo el build del contenedor del frontend con el comando:

docker build -t bekinggo/frontend .

<img src="./screens/build_2.png"/>


Se realizo el push del contendor hacia Docker Hub con el siguiente comando:

docker push bekinggo/frontend

Se realizo el run del contenedor con el siguiente comando:

docker run --rm -it -p 8080:8080 bekinggo/frontend

<img src="./screens/push_run_2.png"/>

- Comprobacion de ejecucion

Se procede a comprobar la creacion de los contenedores con el comando:

Docker images

Se procede a comprobar la ejecucion de los contenedores con el comando:

Docker ps

<img src="./screens/docker_images.png"/>

- Enlace a Video

https://youtu.be/PisncaNxFLM


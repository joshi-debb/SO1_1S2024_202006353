
Laboratorio de sistemas operativos 

Proyecto No. 2

Juan Josue Zuleta Beb - 202006353

## Introducción

En este proyecto, el objetivo principal es desarrollar un sistema de votación para un concurso de bandas de música guatemalteca. El propósito es dirigir tráfico a través de archivos de votación hacia diferentes servicios, como gRPC y WebAssembly (WASM), que se encargarán de encolar los datos recibidos. Además, habrá consumidores que estarán atentos al sistema de colas para enviar los datos a una base de datos en Redis. Estos datos serán visualizados en tiempo real en paneles de control (dashboards). También se empleará una base de datos MongoDB para almacenar los registros (logs), los cuales podrán ser consultados a través de una aplicación web.

## Objetivos

Dxiseñar y desarrollar una arquitectura de software distribuida, donde las distintas funcionalidades del sistema se descomponen en pequeños servicios independientes, conocidos como microservicios.

Utilizar sistemas de mensajería para gestionar la comunicación entre los distintos componentes del sistema de forma asíncrona y desacoplada.

Mostrar de manera visual y dinámica diferentes métricas, estadísticas y datos relevantes del sistema, lo que facilitando la monitorización, el análisis y la toma de decisiones basadas en datos.

## Tecnologías y servicios utilizados

**Google Cloud Platform (GCP):*** Una plataforma de computación en la nube que ofrece servicios para construir, implementar y escalar aplicaciones eficientemente.

**Kubernetes:*** Herramienta de orquestación de contenedores que automatiza el despliegue, escalado y gestión de aplicaciones distribuidas.

**Kafka:*** Plataforma de streaming distribuida utilizada para sistemas de mensajería y procesamiento de datos en tiempo real.

***Nginx:*** Servidor web de código abierto utilizado como proxy inverso, balanceador de carga y caché web, conocido por su alto rendimiento y flexibilidad.

**Cloud Run:*** Servicio administrado que permite ejecutar contenedores sin servidor de manera fácil y rápida, gestionando la infraestructura subyacente automáticamente.

**Ingress:*** Recurso para gestionar el acceso externo a los servicios dentro del clúster Kubernetes, facilitando el enrutamiento y control de tráfico.

***Locust:*** Herramienta de código abierto para pruebas de carga y estrés en aplicaciones web, simula usuarios concurrentes para evaluar el rendimiento.

***Redis:*** Base de datos en memoria utilizada como almacén de datos en caché y para otros casos donde se requiere acceso rápido a los datos.

***MongoDB:*** Base de datos NoSQL de código abierto con un modelo de documentos, altamente escalable y flexible.

***Grafana:*** Plataforma de análisis y visualización de datos utilizada para crear paneles de control interactivos y gráficos basados en datos de diversas fuentes.

***Producers (gRPC, WASM):*** Componentes que generan y envían datos, utilizando gRPC para la comunicación entre servicios y WebAssembly para ejecutar código de alto rendimiento en el navegador web.

***Consumers (daemon en Go con rutinas de Go):*** Componentes que reciben y procesan datos, utilizando un daemon escrito en Go con rutinas para manejar la concurrencia eficientemente.

***Docker:*** Plataforma que permite empaquetar, distribuir y ejecutar aplicaciones en contenedores, simplificando el desarrollo, implementación y escalado de aplicaciones.

***Docker Hub:*** Servicio en la nube para compartir y distribuir imágenes de contenedores, actuando como un repositorio centralizado de imágenes públicas y privadas.


## Deployments y Services de K8S

<div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/be6edf8d-25d9-43b9-b80d-c8f5d237ec29" alt="Services">
</div>

## Ejemplo de funcionamiento

- Primero generamos trafico por medio de loctus en python

</div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/b962b7d1-8fad-440e-b4fb-4991e2e8b835"
  alt="service1">
</div>

- Por medio de la pagina de loctus enviamos el trafico a la ip del servicio de gRPC

</div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/73f2428e-5786-4118-bd17-859ca2a178af"
  alt="service2">
</div>

- Verificamos que el trafico se este enviando correctamente

</div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/6d4e0851-0ef8-43e6-a3aa-015eb257fcb6"
  alt="service4">
</div>

- Consultamos el Dashboard de Grafana para visualizar las métricas y estadísticas en tiempo real

</div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/7c79edc8-06a8-4c2f-a030-c2f9c82bebe3"
  alt="service7">
</div>

- Consultamos el historial de logs almacenados en la base de datos de MongoDB desde la aplicación web

</div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/a05c7cb1-8f68-43c5-8943-f2d5486501a3"
  alt="service9">
</div>

- Verificamos que los datos se hayan almacenado correctamente en la base de datos de MongoDB

</div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/68b007a7-8ec6-4088-9c76-1bc296f1c1db"
  alt="service5">
</div>

- Verificamos que los datos se hayan almacenado correctamente en la base de datos de Redis

</div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/be800698-b8a6-4b0d-b3de-1a01f9f1b556"
  alt="service6">
</div>

## Conclusiones

Se logró implementar una arquitectura de software distribuida basada en microservicios, que permite escalar y desplegar aplicaciones de forma eficiente y flexible.

Se utilizó una combinación de tecnologías y servicios de Google Cloud Platform (GCP), Kubernetes, Kafka, Nginx, Cloud Run, Ingress, Locust, Redis, MongoDB, Grafana, gRPC, WebAssembly (WASM), Go y Docker para implementar un sistema de votación en tiempo real para un concurso de bandas de música guatemalteca.

Se demostró la importancia de utilizar sistemas de mensajería para gestionar la comunicación entre los distintos componentes del sistema de forma asíncrona y desacoplada, lo que permite una mayor escalabilidad, disponibilidad y tolerancia a fallos.

No se pudo demostrar cual servicio es mas rapido entre gRPC y WASM ya que no se logro implementar correctamente el servicio de WASM.

Apesar de no haber implementado correctamente el servicio de WASM utilizaría gRPC para la comunicación eficiente entre servicios distribuidos, mientras que utilizarías WebAssembly para ejecutar código de alto rendimiento en el navegador web o en entornos de servidor.




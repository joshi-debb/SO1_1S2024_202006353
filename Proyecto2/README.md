
<div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/c5b47357-d93e-43ce-a3ca-97a5ff1b3495" alt="logo">
</div>


Laboratorio de sistemas operativos 

Proyecto No. 2

Juan Josue Zuleta Beb - 202006353

## Introducción

En este proyecto, el objetivo principal es desarrollar un sistema de votación para un concurso de bandas de música guatemalteca. El propósito es dirigir tráfico a través de archivos de votación hacia diferentes servicios, como gRPC y WebAssembly (WASM), que se encargarán de encolar los datos recibidos. Además, habrá consumidores que estarán atentos al sistema de colas para enviar los datos a una base de datos en Redis. Estos datos serán visualizados en tiempo real en paneles de control (dashboards). También se empleará una base de datos MongoDB para almacenar los registros (logs), los cuales podrán ser consultados a través de una aplicación web.

## Objetivos

Dxiseñar y desarrollar una arquitectura de software distribuida, donde las distintas funcionalidades del sistema se descomponen en pequeños servicios independientes, conocidos como microservicios.

Utilizar sistemas de mensajería para gestionar la comunicación entre los distintos componentes del sistema de forma asíncrona y desacoplada.

Mostrar de manera visual y dinámica diferentes métricas, estadísticas y datos relevantes del sistema, lo que facilitando la monitorización, el análisis y la toma de decisiones basadas en datos.

## Tecnologías utilizadas

***Google Cloud Platform (GCP):***
Es una plataforma de computación en la nube que ofrece una amplia gama de servicios para ayudar a las organizaciones a construir, implementar y escalar aplicaciones de manera eficiente. Algunos de los servicios clave incluyen Google Compute Engine para máquinas virtuales, Google Cloud Storage para almacenamiento de objetos, Google Kubernetes.

***Kubernetes:***
Es una herramienta de orquestación de contenedores de código abierto desarrollada por Google. Permite automatizar el despliegue, escalado y gestión de aplicaciones en contenedores. Kubernetes abstrae la infraestructura subyacente y proporciona una plataforma para definir y desplegar aplicaciones distribuidas. Utiliza conceptos como pods, servicios y controladores para facilitar la administración de contenedores en entornos de producción.

***Kafka:***
Apache Kafka es una plataforma de streaming distribuida de código abierto utilizada para la construcción de sistemas de mensajería y procesamiento de datos en tiempo real. Kafka está diseñado para manejar grandes volúmenes de datos y proporciona una arquitectura escalable y tolerante a fallos. Permite la publicación y suscripción de flujos de datos en tiempo real, lo que facilita la integración entre aplicaciones y el procesamiento de eventos en tiempo real.

***Nginx:***
Es un servidor web de código abierto que también se puede utilizar como proxy inverso, balanceador de carga y caché web. Es conocido por su alto rendimiento, escalabilidad y capacidades de configuración flexible. Nginx se utiliza comúnmente como un frontend para servidores web y aplicaciones, proporcionando una capa de abstracción entre los clientes y los servidores backend.

***Cloud Run:***
Es un servicio completamente administrado de Google Cloud Platform que permite ejecutar contenedores sin servidor de manera fácil y rápida. Cloud Run administra la infraestructura subyacente, permitiendo a los desarrolladores centrarse en el desarrollo de aplicaciones. Con Cloud Run, los contenedores se escalan automáticamente según la demanda, lo que permite una implementación rápida y eficiente de aplicaciones basadas en contenedores.

***Ingress:***
Es un recurso que gestiona el acceso externo a los servicios dentro del clúster. Permite exponer servicios HTTP y HTTPS en la parte frontal del clúster y proporciona funciones avanzadas de enrutamiento y control de tráfico. Ingress se utiliza comúnmente para enrutar el tráfico web a aplicaciones desplegadas en Kubernetes y para proporcionar funciones de balanceo de carga y terminación SSL.

***Locust:***
Es una herramienta de código abierto para realizar pruebas de carga y estrés en aplicaciones web. Permite simular miles de usuarios concurrentes para evaluar el rendimiento y la escalabilidad de una aplicación. Locust se utiliza comúnmente para identificar cuellos de botella y problemas de rendimiento en aplicaciones web antes de desplegarlas en entornos de producción.

***Redis:***
Es una base de datos en memoria de código abierto que se utiliza como almacén de datos en caché, almacén de sesiones y para otros casos de uso donde se requiere acceso rápido a los datos. Redis es conocido por su alto rendimiento, escalabilidad y capacidades avanzadas de estructuras de datos, como listas, conjuntos, hashes y conjuntos ordenados.

***MongoDB:***
Es una base de datos NoSQL de código abierto que utiliza un modelo de documentos en lugar de un modelo de tablas relacional. Es altamente escalable y flexible, lo que lo hace adecuado para una amplia variedad de aplicaciones. MongoDB se utiliza comúnmente para almacenar datos semi-estructurados y no relacionales, como documentos JSON, registros de eventos y datos de sensor.

***Grafana:***
Grafana es una plataforma de análisis y visualización de datos de código abierto que se utiliza para crear paneles de control interactivos y gráficos basados en datos de diversas fuentes. Permite monitorizar y analizar métricas en tiempo real, realizar análisis históricos y crear visualizaciones personalizadas. Grafana es ampliamente utilizado en operaciones de TI, desarrollo de aplicaciones y análisis de datos para proporcionar información en tiempo real sobre el rendimiento del sistema y las tendencias de datos.

***Producers (gRPC, WASM):***
En este contexto, los "producers" son componentes o servicios que generan y envían datos o mensajes a otros sistemas. gRPC es un sistema de llamada a procedimientos remotos de código abierto que facilita la comunicación entre servicios distribuidos utilizando protocolos como HTTP/2 y serialización de datos gRPC. WebAssembly (WASM) es un estándar web que permite ejecutar código de alto rendimiento escrito en otros lenguajes, como C++ o Rust, dentro del navegador web.

***Consumers (daemon en Go con rutinas de Go):***
En contraste con los "producers", los "consumers" son componentes o servicios que reciben y procesan datos o mensajes generados por los productores. En este caso, se menciona un "daemon" (un proceso en segundo plano) escrito en el lenguaje de programación Go, que utiliza rutinas (goroutines) de Go para manejar la concurrencia de manera eficiente. Esto permite que el consumidor pueda manejar grandes volúmenes de datos de manera eficiente y escalable.

***Docker:***
Es una plataforma de código abierto que permite a los desarrolladores empaquetar, distribuir y ejecutar aplicaciones en contenedores. Los contenedores son entornos ligeros y portátiles que contienen todo lo necesario para ejecutar una aplicación, incluidas las bibliotecas, dependencias y configuraciones. Docker simplifica el proceso de desarrollo, implementación y escalado de aplicaciones al proporcionar un entorno consistente y aislado para ejecutar aplicaciones en diferentes entornos.

***Docker Hub:***
Es un servicio en la nube proporcionado por Docker que permite a los desarrolladores compartir y distribuir imágenes de contenedores. Las imágenes de contenedores son plantillas preconfiguradas que contienen todo lo necesario para ejecutar una aplicación en un contenedor Docker. Docker Hub actúa como un repositorio centralizado de imágenes de contenedores, donde los desarrolladores pueden buscar, descargar y compartir imágenes públicas, así como almacenar imágenes privadas para uso interno.

## Deployments y Services de K8S

<div style="text-align:center">
  <img src="https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/dab86ab3-e1b0-441b-9d26-b43cf1ca1a77" alt="Services">
</div>
## Ejemplo de funcionamiento

![Screenshot from 2024-04-29 10-18-06](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/1f19de30-ae15-410f-b561-7d21e879f787)

![Screenshot from 2024-04-29 10-20-12](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/4713ab7c-31d5-4d6e-bd21-c6d4362f888b)

![Screenshot from 2024-04-29 10-20-25](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/e9f37678-bb82-4e68-a143-9db010344e06)

![Screenshot from 2024-04-29 10-20-33](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/a708860e-d8c9-4781-8159-cae07348fc56)

![Screenshot from 2024-04-29 10-20-58](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/c0fbde1d-fa71-49a5-87e3-9da880dd265a)

![Screenshot from 2024-04-29 10-21-05](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/3dfc3065-8cd0-4126-bc6e-8c1430201053)

![Screenshot from 2024-04-29 10-21-35](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/25fd7e03-c12a-4f24-a469-e9c94df0af12)

![Screenshot from 2024-04-29 10-22-40](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/bb38e178-2692-4267-8a6c-7668012c7990)

![Screenshot from 2024-04-29 10-22-52](https://github.com/joshi-debb/SO1_1S2024_202006353/assets/87725718/101218a3-e9fc-4bd1-99b4-eb078d64dedc)


## Conclusiones




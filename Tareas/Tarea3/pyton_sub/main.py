
import redis

# Establecer conexión con el servidor Redis
conexion = redis.StrictRedis(
    host='10.99.162.155', 
    port=6379, 
    decode_responses=True
)

# Suscribirse al canal 'canal'
canal = conexion.pubsub()
canal.subscribe('test')

# Escuchar los mensajes en el canal
for mensaje in canal.listen():
     # Extraer el mensaje del diccionario recibido
    mensaje = mensaje['data']
    print(f"Channel test: {mensaje}")

# Programacion de aplicaciones 2022

## CORS

CORS se entiende por Cross Origin Resource Sharing, o Intercambio de Recursos de Origen Cruzado. Por defecto, CORS bloquea peticiones desde dominios externos a la aplicacion, por esto, debemos configurar nuestro backend para acepte peticiones desde otros dominios el cual, sera util mas adelante.

Primero, debemos instalar cors: `npm install cors`
Luego, importamos cors desde nuestro index.js y le indicamos a nuestra variable app que use cors mediante `app.use(cors())`.
Por convencion, es recomendable que esto se indique inmediatamente despues de instanciar la variable app ya que, cors() funciona entre el servidor y el cliente siendo un filtro de peticiones. Formalmente a este tipo de procesos (que funcionan entre el servidor y el cliente) se les llama middlewares.

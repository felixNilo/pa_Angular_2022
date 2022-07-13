# Programacion de aplicaciones 2022

## Almacenamiento de nuestros datos

Para almacenar los datos que vamos a manejar en nuestro backend, utilizaremos mongoDB y mongoAtlas. MongoDb es un motor de base de datos no relacionales, mientras que mongoAtlas, es un gestor de base de datos que funciona en la nube. Nos entrega la posibilidad de guardar 500MB de forma gratuita asi es que esto sera mas que suficiente para almacenar nuestra base de datos.

Iremos a la pagina oficial de mongoAtlas https://www.mongodb.com/es/cloud/atlas/efficiency

Desde aqui, crearemos una cuenta para crear un cluster con la configuracion por defecto. Para acceder a este cluster de forma sencilla, utlizaremos el software mongoCompass (https://www.mongodb.com/try/download/compass).
Entonces, descarguemos e instalemos mongoDB Compass.

Ya cuando tengamos arriba nuestro cluster e instalado mongoCompass, conectaremos ambos softwares.  
Desde Atlas, en nuestro cluster, daremos click a conectar, crearemos un usuario y contraseña para nuestra base de datos y seleccionaremos conectar la base de datos mediante mongoCompass. Esto nos dara una url que debemos copiar para pegarla en mongoCompass.  
Luego, desde mongoCompass, damos click sobre conectar, ingresamos la url, y reemplazamos el texto `<password>` con la contraseña que hemos creado para la base de datos. Con ello, deberiamos poder conectarnos a mongoAtlas.

### Creemos un usuario para nuestra aplicacion

Desde mongoAtlas, iremos a Database acces para crear un usuario llamado mean_user, el cual sera el usuario que por ahora modificara nuestra base de datos. Creelo solo con autenticacion por contraseña. Una vez tenga el usuario y la contraseña, guarde estas credenciales en el archivo index.js

Conectemonos a mongoAtlas con estas nuevas credenciales.

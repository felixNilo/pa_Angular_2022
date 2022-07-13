# Programacion de aplicaciones 2022

## Comenzaremos a trabajar con el backend de nuestra aplicacion

Crearemos un nueva carpeta de trabajo llamada adminpro-back. Esta debe estar al mismo nivel que se encuentra nuestra carpeta de la aplicacion. Es decir, deberiamos tener nuesta aplicacion adminpro en una carpeta, y en otra carpeta, tendremos nuestro backend de adminpro.

Estando dentro de la carpeta, desde la barra de comandos ingresaremos el siguiente comando:

`npm init -y`

Esto creara un archivo json que sera el que contendra todas las configuraciones del servidor que vamos a levantar. Para el servidor utilizaremos express.js en su version 4.17.1, entonces, instalaremos express en nuestro directorio del backend mediante el siguiente comando: `npm install express@4.17.1 --save`

Eso no solo creara una carpeta llamada node_modules, sino que importara en nuestro archivo package.json la dependencia con express. Ademas, se creo un archivo llamado package.lock.json el cual contiene las dependencias que utiliza express.

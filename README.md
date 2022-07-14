# Programacion de aplicaciones 2022

## Configuremos variables de entorno

Como en todo proceso de ejecucion, existen variables de entorno. Node no es la excepcion. Imprimamos estas variables de entorno inmediatamente despues de levantar el servidor: `console.log(process.env)`
Agregaremos una nueva variable de entorno a nuestra aplicacion con el fin de que la mantencion del codigo se haga mas sencilla.
Instalaremos un paquete que permite gestionar estas variables de entorno llamado dotenv: `npm install dotenv`

Una vez que hemos instalado el paquete, crearemos un archivo en la raiz de nuestro directorio backend de nombre `.env`  
Dentro de este archivo, podremos instanciar variables el cual seran almacenadas como string. Todas estas variables podran ser leidas desde nuestro backend.

Partamos creando una variable para el puerto del servidor.

`PORT = 3005`

Para agregar esta variable de entorno a la ejecucion de nuestra aplicacion, debemos indicar a nuestro servidor que utilice el paquete dotenv dentro de su configuracion

```
require('dotenv').config();
```

Reiniciemos nuestro servidor para verificar que se ha agregado un nueva variable de entorno.
Con esto, ya deberiamos tener la variable de entorno configurada.
Ahora, podriamos entregar esta variable de entorno a la funcion listen de express.

```app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto ", process.env.PORT);
});
```

Agreguemos la variable de entorno de la url de la base de datos.

`DB_CNN = <url_de_coneccion>`

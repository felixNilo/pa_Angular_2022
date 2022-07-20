# Programacion de aplicaciones 2022

## Crearemos la funcionalidad de buscar en forma general

La idea es que, desde la url, accedamos a cierta funcion que nos permita encontrar todo aquel elemento que contenga lo que estamos buscando.
Por ejemplo, si ingresamos a `/api/todo/felix`, el sistema deberia entregarnos todos los documentos que contengan la palabra **_felix_**. Esto nos puede entregar informacion sensible, asi es que es necesario que se verifique el token de autenticacion para ingresar a la peticion.

### Repeat to learn

Realicemos todo lo necesario para que nuestro backend responda algun mensaje y lo que estamos al solicitar a la url `/api/todo/felix` mediante el metodo get. Es decir, en el caso de solicitar: `/api/todo/felix`, el servidor nos deberia responder un mensaje y **_felix_**.

Una vez que el backend nos responde segun lo requerido anteriormente ya podemos comenzar a generar nuestra busqueda general.

### Comencemos a generar la busqueda general

Sabemos que para utilizar los metodos de busqueda de mongoose debemos importar los modelos. Asi es que importemos los modelos de Usuario, Hospitales y Medicos.

Partamos buscando usuarios que contengan el string que estamos buscando.  
Ya hemos utilizado la funcion find, aunque, esta funcion, devuelve una busqueda exacta, es decir, si un usuario se llama "Felix Nilo", solo la busqueda de **Felix Nilo** nos va a devolver el usuario de aquel nombre.

### Expresiones regulares

Para abordar esto, usaremos expresiones regulares, la cual nos permiten filtrar mediante declaraciones. Utilizaremos la declaracion para hacer insensible la busqueda mediante la siguiente sintaxis:

```
const regex = new RegExp(busqueda, "i");

  const usuarios = await Usuario.find({ nombre: regex });
```

Con esto ya podemos imprimir los usuarios que contengan nuestro string que estamos buscando.

Apliquemos lo mismo para medicos y hospitales, y ademas, utilicemos la funcion Promise.all para hacer que las busquedas se realicen de forma simultanea.

```
const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ]);
```

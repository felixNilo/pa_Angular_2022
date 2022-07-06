# Programacion de aplicaciones 2022

## Configuraremos nuestro routing para nuestras pages.

Queremos que nuestro dashboard sea la ruta principal, luego deben venir las rutas progress y grafica1.

Para ello, simplemente debemos setear la ruta padre como `'path: 'dashboard'`.
Y ademas, redireccionemos al dashboard al ingresar una ruta vacia en nuestro app.routing.

## Finalmente, agregemos un tag a nuestro push en git para documentar la version de la aplicacion.

Para ello, ingresemos por consola `git tag -a v1.1 -m "Rutas listas"` para crear un nuevo tag asociado a nuestro commit.
Ahora, hagamos commit y push de nuestro codigo a nuestro repositorio. Es importante agregar el decorador --tags para que con el push se cree el tag que hemos creado.

# Programacion de aplicaciones 2022

## Desde Admin pro sacaremos las librerias que vamos a utilizar.

Primero debemos ir a nuestra carpeta que descomprimimos en un comienzo. Vamos a la ruta: /Admin pro/
Estando en Admin pro copiaremos en contenido de la carpeta assets y lo copiaremos en los assets de nuestro proyecto Angular ubicado en /src/assets

### Tambien copiaremos los archivos css y js desde /Admin pro/main/ a nuestros assets del proyecto Angular.

Ojo, muchos de los elementos que hemos copiado no los utilirizaremos.

### Referenciamos las librerias que vamos a utilizar desde el archivo html raiz de nuestro proyecto (index.html)

Vamos a utilizar:

```
./assets/images/favicon.png //como un icono
./assets/css/style.css //como hoja de estilos
./assets/css/colors/default-dark.css //como hoja de estilos
./assets/plugins/jquery/jquery.min.js  //como script
./assets/plugins/bootstrap/js/popper.min.js //como script
./assets/plugins/bootstrap/js/bootstrap.min.js //como script
./assets/js/perfect-scrollbar.jquery.min.js //como script
./assets/js/waves.js //como script
./assets/js/sidebarmenu.js //como script
./assets/plugins/sticky-kit-master/dist/sticky-kit.min.js //como script
./assets/plugins/sparkline/jquery.sparkline.min.js //como script
./assets/js/custom.min.js //como script
./assets/plugins/styleswitcher/jQuery.style.switcher.js //como script
```

### Borramos el contenido html del componente raiz y probamos insertando un header para ver si se ha cargado todo.

### Recordar que debemos servir nuestra app **_ng serve -o_**

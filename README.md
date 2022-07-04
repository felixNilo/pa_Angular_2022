# Programacion de aplicaciones 2022

## Desde Admin pro sacaremos las clases y bloques que vamos a utilizar.

Actualizemos la clase de nuestro body en el index con la clase del body de Admin pro.
Copiemos el bloque preloader y copiemoslo en el index.

## Vamos a la plantilla raiz de nuestra app.

Dentro copiaremos el main wrapper de Admin pro.

## Vamos a la plantilla de nuestro header.

Dentro copiaremos el header de clase topbar de Admin pro.

### Llamemos el componente header desde nuestra plantilla raiz.###

Esto debe realizarse mediante el selector `<app-header></app-header>`  
Si nos fijamos, hay algunos iconos que no funcionan. Eso es porque algunos iconos del template se basan es SCSS. Entonces, copiaremos esta carpeta dentro de nuestro assets.  
Ojo, las clases que estamos utilizando provienen de bootstrap, asi es que esa libreria tambien debemos tenerla enlazada en nuestro index.  
Otro aspecto importante es tener en cuenta que las imagenes que estamos enlazando desde nuestras plantillas llaman a nuestro archivos en assets, por que lo que las rutas deben ser actualizadas.

### Actualicemos las animaciones que tienen nuestros elementos HTML.

Para eso, debemos cambiar algunas de las clases de nuestros elementos. Fijese en la clase del elemento que aparece en pantalla al hacer click sobre el icono de mensajes. Al final de la clase de dicho elemento esta el llamado a la clase **_bounceInDown_**. Esto lo cambiaremos por **_fadeIn_**.  
Haremos lo mismo con la animacion del elemento que muestra la informacion del usuario.  
Por ahora no vamos a utilizar el carrusel con el formulario de contacto, asi es que lo sacaremos. Para eso, debes eliminar de la plantilla header el bloque del mega menu.

### Ahora vamos al sidebar. Realizaremos el mismo procedimiento anterior.

Pero esta vez con el bloque `<aside></aside>`. Recuerde que debe llamar al selector del componente sidebar en la plantilla del componente raiz.  
En el sidebar solo dejaremos el bloque del usuario activo, y el bloque del dashboard. Todo los demas items de la lista los borraremos.

### Finalmente, vamos con el breadcrumbs y el contenido de la aplicacion.

Tal como en nuestra plantilla base de Admin pro, vamos a dejar un contenedor de clase `page-wrapper` dentro de otro contenedor de clase `container-fluid`. Dentro de estos vamos a llamar a nuestro componente breadcrumbs, el cual tambien debemos preparar.  
Para ello, al igual que los casos anteriores, extraimos el breadcrumbs de la plantilla Admin pro y lo situamos en la plantilla del componente breadcrumbs.

### Hasta este punto deberiamos tener nuestra estructura casi lista.

Copiaremos el contenedor de contenido de clase `row` de nuestra plantilla base. Dentro de este contenedor estara el contenido de nuestra aplicacion.
Y ademas, copiaremos el footer para ponerlo al final de nuestro contenido.

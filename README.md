# Programacion de aplicaciones 2022

## Creacion de componentes y estructura de nuestra aplicacion!

Creamos una carpeta llama auth dentro de app. Dentro de esta carpeta tendremos los componentes asociados a los procesos de autenticacion de un usuario.

### Partamos creando nuestro primer componente llamado login

Para crear un componente ingresamos el comando **_ng g c auth/login_** el cual indica a la maquina generar (g) un componente (c) dentro de auth/ llamado login.  
Esto nos crea 4 archivos dentro de una carpeta login en auth. Un css (estilos del componente), un html (plantilla del componente), un spec.ts (archivo para pruebas del componente) y un ts (controlador del componente). Por ahora solo nos centraremos en la plantilla y el controlador.  
**Fijese** que en el archivo app.module.ts se ha incorporado el nuevo componente que hemos creado.

### Creemos un nuevo componente llamado register \*\*\*

Al igual que en el caso anterior usaremos el comando ng g c pero agregaremos un metadato al comando para que no cree el archivo de pruebas. **_ng g c auth/register --skip-tests_**

### Ahora creemos algunas paginas para nuestra app

Nuevamente usaremos el comando ng g c pero agregaremos un nuevo metadato al comando para que no cree el archivo de estilos. **_ng g c pages/nopagefound --skip-tests --inline-style_**

### Creemos una pagina para el dashboard

**_ng g c pages/nopagefound --skip-tests --inline-style_**

### Tambien crearemos el componente de breadcrumbs, sidebar y header. Estos deben estar en una carpeta llamada shared

**_ng g c shared/breadcrumbs --skip-tests --inline-style_**  
**_ng g c shared/sidebar --skip-tests --inline-style_**  
**_ng g c shared/header --skip-tests --inline-style_**

## Fijese que el componente raiz (app.module.ts) ahora posee mucho texto.

Mas adelante veremos como optimizar la estructura de este componente.

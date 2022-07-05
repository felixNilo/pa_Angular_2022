# Programacion de aplicaciones 2022

## Crearemos nuestras plantillas de componentes login y register.

Para eso, usaremos la plantilla `pages-login-2.html` desde nuestros archivos de Admin pro. Desde ahi, extraeremos el bloque **_Main Wrapper_**.  
Esto lo pegaremos en nuestra plantilla del login html. **Recuerde que se deben configurar las rutas de los estilos para la plantilla**  
Si nos fijamos, nuestro componente de login, al renderizarlo no se parece a lo que vemos en el pages-login2.html, esto es porque desde este ultimo html se esta cargando un estilo diferente, y es que, el login, posee un aspecto diferente a los demas elementos del sistema. Entonces, crearemos un archivo de estilos para el componente login. Para ello, debemos ir al archivo llamado login.component.css. Este debe contener lo mismo que el archivo css que esta utilizando pages-login2.html (`login-register-lock.css`).
Luego, debemos verificar que el componente utiliza nuestra url de estilos, dada por el archivo que acabamos de crear. **_styleUrls_[ruta_del_archivo_css.css]**

## Realice el mismo procedimiento para nuestro componente register.

### Veremos las animaciones asociadas a los componentes.

Si nos fijamos, algunas de las animaciones son bastante lentas, por lo que, aceleraremos las animaciones.  
Para eso, sobreescribiremos la duracion de las animaciones. Primero, buscaremos el css que estamos utilizando en nuestros assets.  
Veremos que dentro de el, hace uso del archivo `animate.css`. Si vamos a este archivo, veremos todas las animaciones de nuestro sistema. Nos centraremos en la primera declaracion css dada por: `.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}`  
Ahora, podriamos modificar esta declaracion, o bien, podriamos una nueva declaracion de estilos en nuestro css global style.css en la raiz de nuestra aplicacion.
En este commit realizaremos ambas, se ha creado una nueva declaracion de nombre fast (que no vamos a usar) y cambiamos el tiempo de duracion de animaciones en animate.css

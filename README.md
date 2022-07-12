# Programacion de aplicaciones 2022

## Crearemos un nuevo componente de nombre RxJs.

Al igual que las promesas, este componente debe poder ser accesado desde el menu y desde la url `rxjs`.

1. `ng g c pages/rxjs --skip-tests --inline-style`
2. Ingresar ruta en pages.routing.ts
3. Ingresar nuevo arreglo de ruta dentro de sidebar.service.ts

### Problema de estilo en opciones menu

Si nos fijamos, ingresar al sistema a alguna ruta especifica de un componente, el componente cree que el mouse se ha situado encima, por lo que el color no cambia. Solucionaremos este problema y agregaremos que el color de la etiqueta se mantenga al estar dentro del componente al que le corresponde dicha etiqueta.

Para solucionar el error, debemos ir al assets de estilos `custom.min.js`. Si nos fijamos, dentro de el hay codigo javascript, pero no se encuentra comentado. Este codigo hace exactamente lo mismo que lo que hace el codigo de `custom.js`, con la diferencia que en este ultimo codigo podemos encontrar comentarios que separan la funcionalidad del bloque. Entonces, buscaremos la funcion que actualiza el color de las etiquetas `<a>` en nuestra barra de la izquierda y la comentaremos.

```
/* // ==============================================================
  // Auto select left navbar
  // ==============================================================
  $(function () {
    var url = window.location;
    var element = $("ul#sidebarnav a")
      .filter(function () {
        return this.href == url;
      })
      .addClass("active")
      .parent()
      .addClass("active");
    while (true) {
      if (element.is("li")) {
        element = element.parent().addClass("in").parent().addClass("active");
      } else {
        break;
      }
    }
  });
  // ==============================================================
  */
```

Con esto, ya no se agrega el estilo `active` a la clase de la etiqueta `<a>` de forma automatica.  
Pasemos a agregar este `active` a los componentes que estamos renderizando.

### Angular posee una opcion para agregar esto de forma automatica

Podemos entregar a la etiqueta que se crea en nuestro subitem el atributo `active`. Este atributo cambia el valor de `routerLinkActive`, aunque, veremos que por defecto, puede ser que genere errores. Agreguemos el atributo `routerLinkActive` a la etiqueta `<a>` que crea nuestro item en el submenu dentro del componente sidebar.

```
<a [routerLink]="subMenuItem.url" routerLinkActive="active">{{
                subMenuItem.titulo
              }}</a>
```

Con esto vemos que funciona, pero la etiqueta Main se queda seleccionada. Esto es porque parcialmente la ruta vacia (` `) hace match con el routerLinkActive, entonces, debemos agregar un atributo de opciones para este link que indique la ruta debe ser exacta. Para ello, utilizamos `[routerLinkActiveOptions]` y le entregamos un objeto que contenga el atributo exact con un valor true.

```
<a [routerLink]="subMenuItem.url" routerLinkActive="active" [routerLinkActiveOptions] = "{exact : true}">{{
                subMenuItem.titulo
              }}</a>
```

Con ello, deberiamos ver la aplicacion como estabamos esperando.

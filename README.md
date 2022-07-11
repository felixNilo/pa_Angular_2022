# Programacion de aplicaciones 2022

## Sigamos trabajando con el sidebar.

Esta vez, revisaremos un problema comun con el que un desarrollador se puede encontrar mientras utiliza el framework Angular.  
Primero vamos a conectar nuestro sidebar con el componente login.
Para ello, al seleccionar logout desde el sidebar, redireccionaremos al componente login `<li><a routerLink="/login">Logout</a></li>`
Esto lo haremos tambien en el header

```<li>
                <a routerLink="/login"
                  ><i class="fa fa-power-off"></i> Logout</a
                >
              </li>

```

### Desde nuestro login, redireccionemos al dashboard

Primero, vemos que el tipo de boton que posee el formulario es submit, por lo que agregamos a nuestra etiqueta form el atributo `(submit)` el cual llamara a un metodo para dar respuesta al momento de hacer submit.

```
  login() {
    console.log('soy submit');
  }
```

Aun no funciona, ya que recuerden que estamos interactuando con un formulario, lo cual requiere el modulo de formulario para Angular, por lo que debemos importar el modulo en nuestro modulo de autenticacion.
`imports: [CommonModule, FormsModule],`

Hasta aqui, si deberiamos poder ver nuestra respuesta por consola al presionar el boton submit.

### Redireccionemos al dashboard

Para ello, solo debemos utilizar la funcion navigateByUrl de router, el cual proviene del modulo Router de Angular, entonces, tambien debemos importar este modulo antes de usar la funcion. `imports: [CommonModule, FormsModule, RouterModule],`

Ahora, utilizaremos el constructor del componente login para crear una variable de tipo Router, de manera de que podamos utilizarla en la funcion login, de esta forma el controlador del componente quedaria de esta forma:

```
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl('/');
  }
}
```

Fijese que al momento de entrar al dashboard nuevamente, el footer de nuestra pagina no se ve correctamente. Esto ocurre debido a que Angular al inicializar la aplicacion, ejecuta los scripts javascript una vez, y al momento de cambiar de vista no lo vuelve a ejecutar hasta que se solicite una nueva plantilla o que cambie la resolucion de la pantalla.
Para solucionar esto, modificaremos el script javascript que realiza la funcion que personaliza los elementos html.

### Vamos a la plantilla index de nuestra app

Desde aqui, busquemos el archivo que hace uso de custom.min.js
Lo que haremos es basicamente llamar a la funcion de custom.min.js al momento de cargar el componente del dashboard.  
Primero, dentro del archivo script, empaquetaremos la funcion dentro de una nueva funcion de nombre `customInitFunctions`.

```
const customInitFuncions = () => {
  ...(todo lo que contenia custom.min.js)
}
```

Esta funcion debe llamarse a su misma al final del script ya que solo hemos instanciado la funcion, hacer falta invocarla.

```
const customInitFunctions = () => {
  ...(todo lo que contenia custom.min.js)
}

customInitFunctions()
```

Solo hace falta invocarla desde nuestra aplicacion.

### Invoquemos customInitFunctions()

Ya que al ingresar desde el login, entramos a un componente pages, llamaremos la funcion desde el controlador de pages al momento de inicializar el componente, es decir, dentro del `ngOnInit()`.
**OJO**, Angular no reconocera esta funcion ya que viene desde un archivo externo al core de Angular, asi es que debemos declarar esta funcion al comienzo del componente e indicar que la funcion no retorna nada.

```
import { Component, OnInit } from '@angular/core';

declare function customInitFunction(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    customInitFunction();
  }
}
```

Ahora, al cargar algun componente de pages, nuestra aplicacion si renderiza bien la plantilla ya que llama nuevamente al script custom.min.js

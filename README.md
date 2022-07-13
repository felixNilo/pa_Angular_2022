# Programacion de aplicaciones 2022

## Apliquemos lo aprendido e integremos mas conocimiento

La idea es agregar el titulo del componente segun el componente en donde estemos, y ademas, agregar los elementos al breadcrumb.
Primero, agregaremos data en las urls que enviamos a traves de pages.
Para ello, en cada url de nuestro pages.routing podemos agregar data de la siguiente forma:

```
{
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },

```

Ahora, accederemos a esta data mediante la subscripcion a la funcion event de Router.
Para ello, al momento de iniciar el componente Breadcrumbs haremos subscribe a la funcion events de Router, entonces, debemos de instanciar esta variable al momento de crear el constructor.

```
constructor(private router: Router) {
    this.router.events.subscribe((event) => console.log(event));
  }
```

Ahora, si vamos a la consola, veremos que hay arreglos que se han repetido, esto es porque nuestro router primero pasa por la ruta vacia y luego hace un redirect al dashboard. Ahora, de toda esta data, hay dos arreglos que se llaman ActivationEnd. Ambos poseen en su interior el objeto snapshot, y al interior de este objeto se encuentra `data`, aunque, en solo uno de ellos, data tiene asignado un valor. Esto ocurre en todos los componentes que podriamos renderizar dentro de nuestra aplicacion.

### Filtremos nuestra data

Como ya hemos realizado, debemos utilizar la funcion filter dentro de pipe. Primero, dejemos pasar solo las instancias de ActivationEnd.

```
this.router.events
      .pipe(filter((event): event is ActivationEnd => event instanceof ActivationEnd))
      .subscribe((event) => console.log(event));
```

Con esto, solo dejamos pasar las instancias de ActivationEnd con la funcion de javascript `instanceof`.
Ahora solo queda filtrar para obtener la data que tiene valores asignados. Como siempre, se puede hacer de muchas maneras. En este caso, podemos ver que dentro de snapshot tenemos otro objeto de nombre `firstChild`, que es null cuando existen valores en data, mientras que no es null cuando la data no existe. Podriamos utilizar esto para filtrar.

```
filter(
          (event): event is ActivationEnd  =>
            event instanceof ActivationEnd && event.snapshot.firstChild === null
        )
```

Con esto, ya deberiamos aislado el objeto ActivationEnd, ahora extraigamos la data.

```
this.router.events
      .pipe(
        filter(
          (event): event is ActivationEnd =>
            event instanceof ActivationEnd && event.snapshot.firstChild === null
        ),
        map((event: ActivationEnd) => event.snapshot.data)
      )
```

Ya que tenemos la data, podriamos exportar con la clase breadcrumbs la variable titulo. Para eso, crearemos una variables de tipo string que tendra el valor del titulo que se obtenga en el suscriptor del observable mediante el siguiente codigo:

```
export class BreadcrumbsComponent {
  public titulo: string | undefined;

  constructor(private router: Router) {
    this.router.events
      .pipe(...
      )
      .subscribe(({ titulo }) => (this.titulo = titulo));
  }
```

Fijese que la variable titulo puede ser string como tambien undefined. Esto es porque, como vimos, puede ser que el observable no se complete, por lo que titulo puede no tener un valor.

Ahora que tenemos el titulo, imprimamoslo en la plantilla del componente breadcrumbs.

```
<div class="col-md-5 align-self-center">
    <h3 class="text-themecolor">{{ titulo }}</h3>
  </div>
```

Inclusive, podriamos cambiar el titulo de la aplicacion.

```
.subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      });
```

Finalmente, empaquetemos nuestra funcion para que desde el constructor solo llamemos a dicha funcion.

```
constructor(private router: Router) {
    this.getArgumentosRuta();
  }

  getArgumentosRuta() {
    this.router.events
      .pipe(
        filter(
          (event): event is ActivationEnd =>
            event instanceof ActivationEnd && event.snapshot.firstChild === null
        ),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      });
  }
```

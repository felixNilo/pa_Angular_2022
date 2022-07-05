# Programacion de aplicaciones 2022

## Crearemos las rutas de nuestra aplicacion.

Desde la consola tipearemos `ng g m appRouting --flat`. Con esto le decimos al cliente Angular que cree un modulo de nombre app-routing (si, la mayuscula la cambia por un guion y la letra en minuscula). Con la etiqueta --flat le indicamos que cree el modulo plano, es decir, al mismo nivel en el que nos encontramos.  
Vamos a entrar al archivo creado y veremos que se importa un archivo llamado `CommonModule`. Este componente de tipo modulo entrega funcionalidades for, if, while, entre otras, las cuales, para el modulo de rutas no nos va a servir. Dicho esto, eliminamos la linea de codigo que importa dicho modulo. Con ello, tambien debemos dejar vacio el arreglo `imports`.

### Llamemos a nuestros componentes.

Para eso, debemos importar RouterModule desde @angular/router.  
`import {RouterModule} from '@angular/router';`
Ademas, debemos crear un arreglo routes, de tipo Routes que contendra todas nuestras paginas.

```const routes:Routes = [
    {path: 'dashboard', component: DashboardComponent},
    (...) // Agregar todos los componentes que tenemos hasta ahora.
]
```

Fijese que cada vez que llamamos a un componente, el sistema nos importa de forma automatica el componente que estamos llamando.

### Redireccionemos al dashboard si la ruta esta vacia y si es que la ruta es cualquier otra cosa que no este especificada en routes que nos envie al componente NoPageFound.

Para ello debemos usar la siguiente sintaxis
` {path:'', redirectTo: '/dashboard', pathMatch: 'full'}, {path:'**', component: NopagefoundComponent},`

## Nuevas paginas para experimentar.

Creemos dos nuevos componentes para agregar a nuestras rutas. Uno de una barra de progreso y otro para alguna grafica.
**_ ng g c pages/progress --skip-tests --inline-style _**
**_ ng g c pages/grafica1 --skip-tests --inline-style _**
Agregemos estos componentes a las rutas de nuestro arreglo.

## Usemos estas rutas con el componente Router de Angular y exportemoslo a nuestro proyecto.

Para ello, en la sentencia imports debemos entregarle a nuestro modulo de rutas de angular nuestro arreglo de rutas mediante el siguiente codigo:
`RouterModule.forRoot(routes) ///Para cargar rutas raiz. Mas adelante veremos el uso de forChild`
Ademas, debemos crear una nueva llave en nuestro modulo de angular llamado exports para exportar el modulo con las rutas cargadas.

## Llamemos a nuestro modulo de rutas en nuestro modulo de la aplicacion.

Para ello, solo debemos incluir en el import el elemento que estamos exportando en nuestro modulo de rutas: `AppRoutingModule`. Ya ordenaremos la estructura de nuestro modulo de la aplicacion, ya que, como ven, posee gran cantidad de lineas y se torna dificil de leer.

Hasta aqui deberiamos tener nuestro sistema corriendo pero sin renderizar los componentes.
Para eso, debemos usar la etiqueta `<router-outlet></router-outlet>` en nuestra plantilla de la aplicacion.

### Recuerdan que cuando creamos la aplicacion con ng new, el cliente nos pregunto si vamos a usar routing?

Si hubieramos puesto que si, nos hubiera creado un archivo de rutas de forma automatica.

# Programacion de aplicaciones 2022

## Crearemos nuevas rutas para nuestra aplicacion

Partiremos creando un componente que se ocupe de mostrar las paginas cuando el usuario este autenticado.

`ng g c pages/pages --flat --skip-tests --inline-style`

Entonces, vamos a migrar nuestra plantilla html de la aplicacion a nuestra plantilla para usuarios autenticado.  
Ahora, nuestra plantilla html de la aplicacion debera tener solo el router-outlet.

### Creemos un nuevo path en mi modulo de rutas.

Esta vez pasaremos nuestras rutas por nuestro componente pages.  
Para eso, debemos crear un path de ruta vacia que posea como rutas children las rutas que hemos de proteger, en nuestro caso, el dashboard, progress, grafica1, y la ruta vacia para la redireccion al dashboard.

```
{
    path: '',
    component:PagesComponent,
    children: [
      {path:'dashboard', component: DashboardComponent},
      {path:'progress', component: ProgressComponent},
      {path:'grafica1', component: Grafica1Component},
      {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
```

# Programacion de aplicaciones 2022

## Crearemos modulos especializados para grupos de componentes.

La idea es ordenar nuestro app.module.ts de manera agrupar nuestros componentes en distintos modulos.  
Creemos un modulo para nuestras paginas:
`ng g m pages/pages --flat`  
Si vemos el archivo creado, se ha creado un modulo que utiliza CommonModule, que como hemos visto, entrega herramientas for, while, if entre otras...
Dentro de este archivo, en el bloque de declaraciones, importaremos nuestros componentes de paginas, y agregaremos un nuevo bloque para exportar los mismos componentes que declaramos.

```
declarations: [ DashboardComponent, ProgressComponent, Grafica1Component, PagesComponent ],
exports: [ DashboardComponent, ProgressComponent, Grafica1Component, PagesComponent ], imports: [ CommonModule ]
```

Ahora, usaremos este modulo de componentes en nuestro modulo raiz, para ello, solo debemos llamar al modulo en los imports y sacar los componentes que ya no se deberian volver a llamar en app.module
Hasta aqui, el sistema no deberia poder compilar por dos razones.

1. Los componentes de pages usan elementos shared
2. En el modulo que carga los componentes pages no hemos importado el modulo de rutas.

Para el punto 1, realizaremos lo mismo que hemos hecho para pages, pero esta vez para los componentes shared. Ademas, ya que pages usa shared, en el modulo de pages debemos importar el modulo shared.
Para el punto 2, debemos importar el enrutador en nuestro modulo de pages. Para ello en los imports incorporemos `app-routing.module.ts`.
Si nos fijamos, esto ultimo lo estamos importando dos veces. Angular reutiliza el modulo routing que esta en memoria, aunque, podriamos evitar importar el modulo completo dos veces e importar solo el RouterModule de Angular, de esta forma, disminuimos el tiempo de compilacion.

### Sigamos con el modulo de los componentes de auth

`ng g m auth/auth --flat`
Ahora, debemos realizar lo mismo que en el caso anterior con la diferencia que no necesitaremos importar los modulos compartidos ni el router. Si debemos sacar los componentes desde nuestro modulo raiz para importarlos desde el modulo de auth. Luego, en nuestro modulo raiz debemos llamar a estos componentes desde el modulo de auth.

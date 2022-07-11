# Programacion de aplicaciones 2022

## Trabajaremos rapidamente con Router Link

De manera que nuestros enlaces desde el sidebar funcionen.
Iremos a nuestro componente sidebar y actualizaremos las etiqueta `<a>` redireccionando a los componentes que hemos creado.

```
          <ul aria-expanded="false" class="collapse">
            <li><a routerLink="/dashboard/grafica1">Grafica</a></li>
            <li><a routerLink="/dashboard/progress">Progreso</a></li>
          </ul>
```

Ahora, nuestros enlaces aun no deberian funcionar ya que no hemos importados el modulo Router desde nuestro modulo de componentes compartidos.

```
imports: [CommonModule, RouterModule],
```

Hasta aqui, manejamos los enlaces desde el front ent. Debemos tener en cuenta que abran situaciones en que el back end tendra que enviarnos a algun enlace, de esta forma, debemos incorporar un nuevo concepto de Angular: los servicios.

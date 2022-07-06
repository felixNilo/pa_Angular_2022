# Programacion de aplicaciones 2022

## Trabajaremos con el componente Progress.

Primero, modificaremos la forma en que se renderiza la aplicacion.
En nuestra plantilla de paginas dejaremos solo el router-outlet, ya que los contenedores seran renderizados por los propios componentes.  
De esta forma, nuestra plantilla html de pages quedaria:

```
<div id="main-wrapper">
  <app-header></app-header>
  <app-sidebar></app-sidebar>
  <div class="page-wrapper">
    <div class="container-fluid">
      <app-breadcrumbs></app-breadcrumbs>
      <!-- Comienzo del sistema de rutas -->
      <router-outlet></router-outlet>
      <!-- Fin del sistema de rutas -->
      <!-- footer -->
      <!-- ============================================================== -->
      <footer class="footer"> © 2022 Programacion de aplicaciones </footer>
      <!-- ============================================================== -->
      <!-- End footer -->
    </div>
  </div>
</div>
```

Mientras que nuestra plantilla de progress quedaria:

```
<div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          Progress work
        </div>
      </div>
    </div>
  </div>
```

### Extraigamos nuestras barras de progreso desde nuestra plantilla base de admin pro.

Busquemos el archivo llamado ui-progressbar.html  
Dentro de el podremos ver que se llama a un archivo de estilos en especifico. (Esto ya se ha visto).
Como en ramas anteriores, extraigamos dicho CSS, creemos el archivo de estilos de componente, importemoslo y hagamos uso de los estilos con algun bloque de nuestra plantilla.  
Usaremos una barra de progreso desde nuestra plantilla de admin pro. El codigo de nuestra plantilla de progress deberia quedar de esta forma:

```
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Striped Progress bar</h4>
                <div class="progress m-t-20">
                    <div class="progress-bar bg-info progress-bar-striped active" aria-valuenow="85" aria-valuemin="0"
                        aria-valuemax="100" style="width: 85%; height:10px;" role="progressbar"> <span
                            class="sr-only">85% Complete (success)</span> </div>
                </div>
            </div>
        </div>
    </div>
</div>

```

Ademas, vamos a la plantilla form-basic.html y busquemos un input con dos botones en el extremo para agregarlo a nuestra plantilla de pages. Importante, queremos que este input este en el primer espacio de una fila de dos columnas de igual tamaño. Para ello, debemos agregar una nueva fila en nuestra plantilla y dos columnas de tamaño 6.

```
<div class="row">
    <div class="col-6">
        <div class="card">
            <div class="card-body">
                Una columna
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="card">
            <div class="card-body">
                Otra columna
            </div>
        </div>
    </div>
</div>
```

Dentro de la primera columna, pegaremos el elemento de la plantilla base form-basic.html

```
<div class="row">
  <div class="col-6">
    <div class="card">
      <div class="card-body">
        <div class="input-group">
          <span class="input-group-btn">
            <button class="btn btn-danger" type="button">Hate it</button>
          </span>
          <input type="text" class="form-control" placeholder="Product name" />
          <span class="input-group-btn">
            <button class="btn btn-success" type="button">Love it</button>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-6">
    <div class="card">
      <div class="card-body">Otra columna</div>
    </div>
  </div>
</div>
```

Cambiemos los atributos class de los botones dejando los dos como primary, y los textos de los botones; uno lo reemplazaremos por un icono de clase fa fa-minus y el otro por un icono de clase fa fa-plus

```<div class="input-group">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button">
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <input type="text" class="form-control" placeholder="Product name" />
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button">
              <i class="fa fa-plus"></i>
            </button>
          </span>
        </div>
```

## Juguemos con el porcentaje de la aplicacion.

Podriamos cambiar el porcentaje mediante la modificacion del atributo style de la barra de progreso.
Intuitivamente, podriamos cambiar el valor de % del style. Esto tambien puede ser enviado desde el controlador de nuestro componente.  
Si en nuestro export inicializamos una variable de tipo numero llamado progreso y la llamamos en el codigo mediante dobles llaves podriamos utilizar esa variable pero el codigo es un poco complicado de leer. Asi quedaria el export de nuestro controlador del componente progress (sacamos la funcion OnInit ya que no la vamos a usar aun):

```
export class ProgressComponent {
  progreso: number = 40;
}

```

y asi podria quedar el elemento de la barra de progreso.

```
          <div
            class="progress-bar bg-info progress-bar-striped active"
            style="width: {{ progreso }}%; height: 10px"
            role="progressbar"
          >
          </div>
```

Tambien podria ser:

```
          <div
            class="progress-bar bg-info progress-bar-striped active"
            style="height: 10px"
            [style.width]="progreso + '%'"
            role="progressbar"
          ></div>
```

Ambos casos funcionan aunque, en el primer caso, el editor nos podria generar alertas por posibles inconsistencias en el codigo, mientras que en el segundo caso, estamos trabajando con strings. De esta forma, este string podria ser devuelto por una funcion con el simbolo de % desde el export. Entonces, el export podria ser:

```
export class ProgressComponent {
  progreso: number = 90;

  get getPorcentaje() {
    return `${this.progreso}%`;
  }
}
```

Ahora, desde la plantilla de progress llamamos a la funcion `[style.width]="getPorcentaje"`

### Vamos con los botones.

Creemos una funcion que reciba un numero y actualice el valor de la variable progreso:

```
cambiarValor(valor:number){
  return this.progreso = this.progreso + valor;
}
```

Ahora, en angular existe el atributo `(click)` para los elementos html. De esta forma, para el boton de menos, el atributo click llamara a la funcion cambiar entregandole un valor de -x, donde x podria ser un numero arbitrario. Probemos con 5!

```
<div class="input-group">
          <span class="input-group-btn">
            <button
              class="btn btn-primary"
              type="button"
              (click)="cambiarValor(-5)"
            >
              <i class="fa fa-minus"></i>
            </button>
          </span>
          <input type="text" class="form-control" placeholder="Product name" />
          <span class="input-group-btn">
            <button
              class="btn btn-primary"
              type="button"
              (click)="cambiarValor(5)"
            >
              <i class="fa fa-plus"></i>
            </button>
          </span>
        </div>
```

El unico problema que tenemos es que, cuando hacemos muchos click en algun boton, progreso se pasa de los limites (-100 y 100). Esto lo puede verificar haciendo un logeo por consola del valor de progreso luego de actualizarlo `console.log(this.progreso)`. Como sabemos, hay muchas formas de arreglar esto. Hemos usado la siguiente forma, aunque, es recomendable, que a modo de ejercicio, busquen otra manera de realizar la validacion...

```
cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      return (this.progreso = 100);
    }
    if (this.progreso <= 0 && valor <= 0) {
      return (this.progreso = 0);
    }
    return (this.progreso = this.progreso + valor);
  }
```

### Vamos con el elemento input.

En angular, existe una etiqueta de tipo funcion para plantillas que permite sincronizar elementos del controlador con la plantilla. Aunque, para eso, debemos importar el modulo de formularios de Angular.
Para ello, primero, generemos el llamado de la etiqueta tipo funcion desde la plantilla en el elemento input:

```
          <input
            type="text"
            class="form-control"
            placeholder="Progreso"
            [(ngModel)]="progreso"
          />
```

Esto generara un error ya que no hemos importado el modulo de formularios de Angular para que pueda hacer uso de funcion de sincronizar los valores. Entonces, vamos al modulo de pages para importar FormModule desde Angular:

```
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    //AppRoutingModule,
    SharedModule,
  ],
```

# Programacion de aplicaciones 2022

## Supongamos que tenemos dos barras de progreso.

```
        <div class="progress m-t-20">
          <div
            class="progress-bar bg-primary progress-bar-striped active"
            style="height: 10px"
            [style.width]="getPorcentaje"
            role="progressbar"
          ></div>
        </div>
        <div class="progress m-t-20">
          <div
            class="progress-bar bg-info progress-bar-striped active"
            style="height: 10px"
            [style.width]="getPorcentaje"
            role="progressbar"
          ></div>
```

Si quisieramos tener un nuevo incrementador, deberiamos copiar el codigo de la plantilla. Entonces, podriamos separar la logica del incrementador en un nuevo componente.

## Entonces, creemos un modulo dentro de una carpeta componentes.

Este modulo se ocupara de importar y exportar los componentes que vamos a reutilizar en nuestra aplicacion.

`ng g m components/components --flat`

Luego, generaremos el componente del incrementador dentro de la carpeta componentes.

`ng g c components/incrementador --skip-tests --inline-style`

Ya que el modulo de componentes es el que se ocupa de entregar los componentes que se reutilizan, debemos exportar al componente Incrementador.

```
@NgModule({
  declarations: [IncrementadorComponent],
  exports: [IncrementadorComponent],
  imports: [CommonModule],
})
```

### Importemos el modulo de componentes en donde lo vamos a necesitar (pages)

Entonces, vamos al modulo de pages e importemos el modulo de components

```
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    //AppRoutingModule,
    SharedModule,
    ComponentsModule,
  ],
```

La aplicacion deberia estar funcionando tal cual...
Ahora, sacaremos el codigo del incrementador de nuestra plantilla de progress para dejarlo en la plantilla del incrementador. Luego, ya podemos llamar al componente incrementador mediante su selector `<app-incrementador></app-incrementador>` desde la plantilla de progress.
Hasta aqui, al compilar tendremos varios errores:

1. El componente incrementador esta haciendo uso de funciones que antes estaban en progress.
2. Desde el incrementador estamos llamando a etiquetas de funciones sin tener importado el FormModule de Angular.

Entonces, para el punto 1. moveremos las funciones del controlador de progress al controlador del incrementador, esto traera un error del elemento de barra de progreso de la plantilla, asi es que comentaremos esa linea por ahora.
Para el punto 2. importaremos FormModule en nuestro modulo de componentes.

Ahora, podriamos utilizar el componente incrementador las veces que queramos desde nuestro progress.

```
<div class="row">
  <div class="col-6">
    <div class="card">
      <div class="card-body">
        <app-incrementador></app-incrementador>
      </div>
    </div>
  </div>
  <div class="col-6">
    <div class="card">
      <div class="card-body">
        <app-incrementador></app-incrementador>
      </div>
    </div>
  </div>
</div>
```

## Ahora debemos comunicar el componente hijo (incrementador) con el componente page (progress)

### Primero intentemos pasar el valor de progreso desde al padre al hijo.

Para ello, solo debemos hacer uso de lo que en Angular se llama @Input.
De esta forma, la variable progreso sera inicializada como un @Input:
`@Input() progreso: number = 90;`.  
Con esto, desde progress, al momento de llamar al componente incrementador, podemos pasarle un valor para el valor progreso de la siguiente forma:
`<app-incrementador [progreso]="15"></app-incrementador>`  
Fijese que si no se le da ningun valor a esta variable input, esta se inicializa como se indica en el controlador del componente.  
Esto tambien se puede hacer con algun otro nombre... Por ejemplo, si inicializamos la variable progreso de la siguiente forma:
``@Input('otro_nombre') progreso: number = 90;`.  
En ese caso, debemos enviar desde el padre un valor para el identificador otro_nombre
`<app-incrementador [otro_nombre]="15"></app-incrementador>`

### Pasemos a entregar un valor desde el hijo al padre.

Para ello, utilizaremos @Output, el cual para Angular, es un evento.
Tenga en cuenta que debemos instanciar este evento con un nombre y un valor. Para ello, escribiremos la siguiente linea de codigo, luego de instanciar la variable progreso: `@Output() valorSalida: EventEmitter<number> = new EventEmitter();`
Ya que tenemos la variable que emite un valor de tipo number, podemos emitir dicho valor luego de actualizar el valor de progreso:
`this.valorSalida.emit(x)` donde x es el numero que queremos emitir.

Si vamos a nuestra aplicacion, pareciera ser que aun nada ha cambiado, pero en realidad, cada vez que actualizamos el valor de progreso, el valor se esta enviando al padre. Para recibir el valor, debemos llamar al evento desde el selector del componente mediante la siguiente sintaxis:
`<app-incrementador (nombre_del_emisor)="accion_a_realizar" [progreso]="15"></app-incrementador>` donde nombre_del_emisor es el identificador de la variable que esta emitiendo, y accion_a_realizar es la accion que se va a realizar tras ocurrir el evento @Output.

### Creemos un receptor para nuestro emisor.

En nuestro controlador de progreso, creemos una funcion llamada cambioValorHijo() que nos avise por consola que algo esta se esta recibiendo.

```
export class ProgressComponent {
  cambioValorHijo() {
    console.log('Recibo');
  }
}
```

De esta forma, nuestro selector quedaria de la siguiente forma: `<app-incrementador (valorSalida)="cambioValorHijo()" [progreso]="15"></app-incrementador>`

Ahora, pasemos el valor numerico. Para ello, simplemente debemos agregar un atributo numerico al crear la funcion de recepcion del evento, y cuando llamemos a la funcion en el selector, debemos entregar la etiqueta `$event`.  
Selector:
`<app-incrementador (valorSalida)="cambioValorHijo($event)" [progreso]="15"></app-incrementador`
Funcion receptor:

```cambioValorHijo(valor: number) {
    console.log('Recibo ', valor);
  }
```

Ya deberiamos poder recibir el valor.

### Ahora conectemos el valor recibido con la barra de progreso.

Primero, en nuestro controlador de progress, creemos las variables y funciones para entregar el progreso de las barras:

```
 progreso1: number = 25;
  progreso2: number = 75;

  get getProgreso1(){
    return `${this.progreso1}%`
  }

  get getProgreso2(){
    return `${this.progreso2}%`
  }
```

Ahora, en nuestro selector, en vez de llamar a la funcion `cambioValorHijo`, directamente modificaremos el valor de progreso1 o progreso2 dependiendo del selector:`(valorSalida)="progreso1 = $event"`.
Recuerda que el valor que estamos comunicando al hijo ya no es 15, sino que es progreso1.
Finalmente, debemos mostrar el progreso en la barra, por lo que descomentaremos el codigo que habiamos comentado anteriormente y llamaremos a las funciones getProgreso1 y getProgreso2.

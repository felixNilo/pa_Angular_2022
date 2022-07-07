# Programacion de aplicaciones 2022

## Pulamos nuestro componente incrementador.

Primero dejemos nuestro input de tipo numerico.
Luego, intentemos limitar el valor que se le da a progreso al momento de que cambie el input. Para ello, usemos la funcione ngModelChange. Esta funcion permite ejecutar algun script al momento de ocurrir algun cambio en el componente. En este caso, llamaremos una funcion que nos entregue el cambio que esta ocurriendo.

```
  onChange(valor: number) {
    //console.log(valor);
  }
```

Ahora, llamemos la funcion desde el elemento html:

```
  <input
    type="number"
    class="form-control"
    [ngClass]="{ 'is-invalid': progreso > 100 || progreso < 0 }"
    placeholder="Progreso"
    (ngModelChange)="onChange($event)"
    [(ngModel)]="progreso"
  />
```

### Ya podemos ver los cambios por consola del navegador.

Con esto, solo nos queda limitar el valor y emitir el valor a traves del componente Output.

```
  onChange(valor: number) {
    //console.log(valor);
    if (valor >= 100) {
      this.progreso = 100;
    } else if (valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);
  }
```

Podemos verificar el valor que estamos recibiendo a traves de imprimir la variable progreso1 o progreso2 en nuestra plantilla progress: `{{progreso1}}`.

### Cambiemos el estilo del input cuando el valor de progreso es mayor que 100 o menor que 0

Para ello, solo tenemos que incluir en nuestro input la etiqueta `[ngClass]` el cual nos permite generar scripts sobre la clase: `[ngClass]="{ 'is-invalid': progreso > 100 || progreso < 0 }"`

# Programacion de aplicaciones 2022

## El metodo retry

Antes de comenzar a manipular nuestro observable, dejemos la inicializacion de la variable i afuera del observable. Esto nos ayudara a comprender mejor el codigo que vamos a hacer a continuacion.
Debemos saber que la funcion retry busca reinicializar el codigo del observable tantas ves se espeficique en la invocacion de la funcion. Es importante saber que esta funcion funciona de la mano a `pipe` ya que se inserta entre le observable y el suscriptor.

```
export class RxjsComponent {
  constructor() {
    let i = 0;
    const obs$ = new Observable((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego a 2');
        }
      }, 1000);
    });

    obs$.pipe(retry()).subscribe({
      next: (valor) => console.log('Subs: ', valor),
      error: (error) => console.error('Error: ', error),
      complete: () => console.info('Obs complete'),
    });
  }
}
```

Con esto, vemos que nuestra aplicacion no nos lanza un error y esto es porque retry esta por defecto intentando ejecutar el codigo del observable hasta que este llegue a la funcion complete. De hecho, pasa por el error, pero lo salta. Puede comprobar esto imprimiendo por consola que i ha llegado a 2 `console.log('i llego a 2');`  
Supongamos que el tenemos varios errores durante la ejecucion del observable.

Para ello, podriamos darle un valor de 0 a la variable i cuando esta llegue al valor 2.

```
if (i === 2) {
          i = 0;
          observer.error('i llego a 2');
        }
```

Ahora, el retry intenta infinitas veces llegar al complete. Podemos limitar las veces que se reintenta llegar al complete entregandole un valor a la funcion retry. Por ejemplo, para intentarlo solo 1 vez mas: `retry(1)`  
Si bien, no se reintenta, el observable sigue entregando respuesta y esto es porque la funcion setInterval aun sigue ejecutandose. Para ello, luego del error, podriamos agregar nuevamente el codigo `clearInterval(interval);`
De esta forma, podriamos reintentar cierta ejecucion de algun observable las veces que estimemos conveniente, aunque, se recomienda manejar errores en vez de reintentar.

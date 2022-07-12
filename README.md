# Programacion de aplicaciones 2022

## A veces tendremos que mantener vivo el observable hasta cierto tiempo

Volvamos a donde comenzamos, es decir, que nuestro observable se ejecute infinitamente.

```
 retornaIntervalo() {
    const intervalo$ = interval(500).pipe(
      //take(10),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
    return intervalo$;
  }
```

Con esto vemos que, el valor primero pasa por map, se le suma uno, y luego se filtra por numeros pares. Esto no tiene fin, de hecho, si vamos a otro componente y volvemos al componente rxjs, volvemos a instanciar un nuevo observable. Asi, podriamos tener infinitos observables durante un tiempo infinito (hasta que exista espacio de memoria que permita almacenar el tamaño del numero o la cantidad de observables).

### Para detener la ejecucion del observable, podemos utilizar unsubscribe

El plan; queremos que al momento de irnos a otro componente de nuestra aplicacion, detengamos la ejecucion del observable. Primero, utilicemos la funcion OnDestroy, el cual, ejecuta funciones al momento de detener un componente. Para ello, debemos de crearla al igual como se crea el ngOnInit.

```
export class RxjsComponent implements OnDestroy {
  constructor() {...}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
```

Si ejecutamos esto, veremos que al salir del componente rxjs nos lanza el error que esta por defecto.
Entonces, en vez de lanzar este error, debemos de ejecutar la funcion unsubscribed, aunque, como es en el caso de clearInterval, debemos de instanciar el observable mediante una variable, para que desde esta variable apliquemos la funcion unsubscribe.

```
  public intervalSub: Subscription;
  constructor() {
    this.intervalSub = this.retornaIntervalo().subscribe((valor) =>
    );
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

```

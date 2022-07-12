# Programacion de aplicaciones 2022

## Crearemos un observable de forma manual

Esto lo trabajaremos dentro del componente Rxjs, asi es que vamos al controlador del componente y quitemos el ngOnInit ya que no lo vamos a utilizar. Aqui, crearemos una variable observable y la llamaremos para que comencemos a interiorizarnos con los observables. Realizaremos esto dentro del constructor de manera de ver lo que ocurre al momento de inicar el componente.

```
constructor() {
    const obs$ = new Observable((observer) => {
      let i = 0
      setInterval(() => {
        i++;
      }, 1000);
    });

    obs$.subscribe((valor) => console.log('Subscriber'));
  }
```

La funcion setInterval es una funcion de javascript que ejecuta codigo en intervalos de tiempo, en este caso, ejecuta un `console.log` cada 1000 milisegundos. Luego, la funcion subscribe llama al observable, y comienza a ejecutar el codigo del observable mientras espera que el observable retorne un valor para asignarle este valor a la variable `valor` y ejecutar la funcion flecha (lo cual hasta ahora no ocurre).
Retornemos un valor desde el observable. Para ello, utilizaremos la funcion `next` propia de los observables.

```
const obs$ = new Observable((observer) => {
      let i = 0;
      setInterval(() => {
        i++;
        console.log('emitting');
        observer.next(i);
      }, 1000);
    });
```

Hasta aqui, ya estamos recibiendo un valor, podriamos imprimirlo por consola.

`obs$.subscribe((valor) => console.log('Subscriber: ', valor));`

Lo mas interesante, es que si cambiamos de componentes, el observable se sigue ejecutando en memoria. Ahora, si volvemos a inicializar el componente que hace el llamado al observable, tendremos dos observables ejecutando el proceso. Ya podemos ver que el observable puede traernos problemas de memoria, entonces, detendremos el observable cuando el valor de i llega a 5. Antes, es importante saber que setInterval se detiene con la funcion `clearInterval`, aunque, para esto, setInterval debe estar instanciado por una variable.

```
const obs$ = new Observable((observer) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    });
```

De esta forma, vemos que la funciona `complete` del observable detiene la ejecucion del observable.  
Desde nuestro suscriptor del observable se pueden manejar errores e informacion proveniente del observable.

```
obs$.subscribe(
      (valor) => console.log('Subscriber: ', valor),
      (error) => console.error('Error ', error),
      () => console.info('Obs terminado '));
```

Aunque, **ojo**, esta sintaxis en los ultimas versiones de javascript se encuentra deprecada. De esta forma, la nueva sintaxis recomendada es la siguiente:

```
obs$.subscribe({
      next: (valor) => console.log('Subs: ', valor),
      error: (error) => console.error('Error: ', error),
      complete: () => console.info('Obs complete'),
    });
```

Disparemos un error desde nuestro observable.

```
if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }
        if( i === 2){
          observer.error('i llego a 2');
        }
```

Como se puede apreciar, el error tambien detiene la ejecucion del observable.

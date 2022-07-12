# Programacion de aplicaciones 2022

## Un observable se puede especificar en terminos de lo que retorna

Por defecto, el Observable puede o no retornar algo **desconocido**, pero nosotros podriamos especificar que es lo que retornara mediante la siguiente sintaxis `Observable<number>`, lo cual indica, en este caso, que retornara un numero.

### Empaquetemos el observable

Dispongamos nuestra definicion de observable dentro de una funcion que retorne el observable:

```
retornaObservable(){
    let i = 0;
    const obs$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          console.log('llego a 2');
          i = 0;
          observer.error('i llego a 2');
          clearInterval(interval);
        }
      }, 1000);
    });
    return obs$;
  }
```

O podriamos especificar mas aun que tipo de funcion es:

```
retornaObservable(): Observable<number>{...}
```

Solo nos queda llamar a esta funcion: `this.retornaObservable().pipe(...)`

Hasta aqui, nuestro codigo deberia estar funcionando de la misma forma que en el branch anterior.

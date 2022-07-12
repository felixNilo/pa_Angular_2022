# Programacion de aplicaciones 2022

## Utilicemos los observables que nos entrega rxjs por defecto

El codigo que hemos creado hasta ahora busca ejecutar codigo entre intervalos de tiempo. Angular, nos entrega este tipo de funciones observables por defecto. Podriamos importar desde rxjs la funcion `interval`: `import { Observable, retry, interval } from 'rxjs';`
Utilizaremos esta funcion que hemos importado en una nueva funcion:

```
retornaIntervalo(){
    const intervalo$ = interval(1000);
    return intervalo$;
  }
```

Podemos ver que esta funcion es de tipo observable.
Ahora, en el constructor, nos suscribiremos a este observable e imprimiremos por consola lo que nos devuelve. Comentemos el codigo anterior para no generar confusion.

```
this.retornaIntervalo().subscribe((valor) => console.log(valor));
```

Vemos que la funcion retorna un numero de forma indefinida. Ahora, javascript entrega la posibilidad de reducir esta sintaxis a: `this.retornaIntervalo().subscribe(console.log); ` mas, esto no es recomendable ya que el codigo se vuelve poco legible.

### Intentemos limitar el numero de veces que se ejecuta nuestro observable.

Para ello podemos utilizar la funcion `take` dentro de la funcion `pipe` de igual forma como si estuvieramos utilizando `retry` de la siguiente forma: `const intervalo$ = interval(1000).pipe(take(4)); `

### Manipulemos el valor que retorna interval.

Tenemos que tener en cuenta que en cada interval se genera un valor, entonces, podemos tomar ese valor, manipularlo y retornarlo. Para acceder al valor podemos utilizar la funcion `map` a la misma altura que la funcion `take`: ` const intervalo$ = interval(1000).pipe(take(4), map(valor=>{return(valor+1)}));`

Ahora vemos que en vez de que se retorne desde el 0, retornamos desde 0+1.  
Esta ultima linea de codigo tambien podria ser escrita de la siguiente forma: `map((valor) =>{valor + 1;})` aunque, nuevamente, dificultamos la facil lectura del codigo.

# Programacion de aplicaciones 2022

## Supongamos que nuestro observable itera hasta el valor de 10

Pero esta vez en intervalos de 500 ms.

```
retornaIntervalo() {
    const intervalo$ = interval(500).pipe(
      take(10),
      map((valor) => {
        return valor + 1;
      })
    );
    return intervalo$;
  }
```

Ahora, solo queremos los datos para retornos de numeros pares. Aqui es donde podemos utilizar la funcion `filter`. Primero debemos tener claro que para verificar si un numero es par o no es par debemos verificar el resto que se obtiene tras dividir el numero en 2, si el resto es 1 entonces no es par, mientras que si el resto es 0 entonces si es par (division sintetica => %)

De esta forma, `filter` se podria escribir de la siguiente forma: `filter(valor => (valor % 2 === 0)? true: false)`. Como vemos, al igual que map, se crea una variable que guardara el valor, pero, esta vez, no creamos un bloque de codigo, mas bien, directamente debemos verificar, cuando se retorna (true) y cuando no (false). Por ejemplo, si nuestro codigo fuera: `filter((valor) => true)` simplemente no filtraria nada, y si en vez de true fuera false, no dejaria pasar nada.

### La importancia del take.

Intente mover la funcion `take(10)` despues de realizar el filtro.

```
retornaIntervalo() {
    const intervalo$ = interval(500).pipe(
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false)),
      take(10)
    );
    return intervalo$;
  }
```

Ahora vemos que el valor llega a 20, y es porque `take` se ocupa de contar las veces que nuestro observable retorna valores, en este caso numericos.

Todas estas funciones, que en la teoria se llaman operadores, estan documentados en https://reactivex.io/documentation/operators.html

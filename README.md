# Programacion de aplicaciones 2022

## Que son los observables y las promesas

Son propiedades de estado de procesos. Sirven para trabajar con procesos asincronos, es decir, que no hay tiempo determinado entre la respuesta y la peticion.

### Las promesas

Trabajan con un unico flujo de datos, se usan con una unica data asincrona de respuesta y no es simple de cancelar.
Una promesa, pasa desde una sentencia de codigo, luego, pasa a una sentencia `then` y luego, un `resolve` o un `reject`.

### Los observables

Trabajan con un flujo continuo de datos, al fallar, se puede reintentar ejectura el observable.
Un observable, pasa por una sentencia de codigo, luego puede pasar por eventos, sentencias para cancelar la operacion, reintentar, filtrar, o incluso hacer un ciclo infinito.

## Partamos ejercitando con promesas

Creemos un componente dentro de pages de nombre promesas `ng g c pages/promesas --skip-tests --inline-style`  
Agreguemos una ruta para renderizar al componente (en **_pages.routing.ts_**).

Ademas, agregemos un enlace desde el menu (en **_sidebar.service.ts_**).

Ahora, creemos una promesa en el controlador del componente promesa.
Recuerde que una promesa **debe** contener al menos una sentencia. Es decir, que si creamos la promesa sin sentencia, nos generara un error.  
Dicho esto, creemos la funcion dentro del ngOnInit()

```
  ngOnInit(): void {

    const promesa = new Promise(()=>{
      console.log('Hola Mundo');
    });

    console.log('fin del Init')
  }
```

Si se fijan, con esto, el codigo corre de forma sincrona, es decir, todo sigue un orden secuencial, y es porque aun no insertamos una resolucion. Para ello, en vez de hacer un console log, llamaremos a una funcion. En este caso, la llamaremos resolve.

```const promesa = new Promise((resolve)=>{
      resolve('Hola Mundo');
    });
```

Ahora es cuando instanciamos un procedimiento asincrono, y es que llamaremos a la promesa, y luego (**_then_**) imprimiremos por consola. Esto lo haremos antes del fin del init.

```
  ngOnInit(): void {

    const promesa = new Promise((resolve)=>{
      resolve('Hola Mundo');
    });

    promesa.then(()=>{
      console.log('Termino la promesa')
    })

    console.log('fin del Init')
  }
```

Si revisamos la consola, veremos que la promesa toma tiempo para ser ejecutada.  
Las promesas nos permiten manejar errores durante el tiempo de ejecucion mediante la insercion de una nueva funcion en su declaracion. De esta forma, dentro de la promesa, podremos manejar dos funciones, para cuando no hay error y para cuando hay error.

```const promesa = new Promise((resolve, reject) => {
      if (true) { //condicion que verifica que no hay error
        resolve('Hola Mundo');
      } else {
        reject('Algo salio mal');
      }
    });
```

Supongamos que hay error forzando que la funcion entre en el segundo caso (reject) ` if (false)`

Ahora por consola nos arroja un error ya que en la promesa esta entrando a la segunda funcion la cual es para errores. Para evitar este error por consola, podemos manejar el error al momento de llamar a la promesa.

```
promesa
      .then(() => {
        console.log('Termino la promesa');
      })
      .catch((error) => console.log('error en mi promesa', error));
```

Comentemos el codigo anterior. Aplicaremos lo aprendido en un caso practico.  
Vamos al sitio reqres.in  
Aqui encontraremos respuesta a peticiones. Utilizaremos la respuesta a peticion desde la url reqres.in/api/users

Crearemos una funcion llamada `getUsuarios()` el cual utilizara la funcion fetch de javascript para ingresar a la url de reqres.

```
getUsuarios(){
  fetch('https://reqres.in/api/users').then(() =>
      console.log('tengo la data')
}
```

Llamemos la funcion al momento de iniciar el componente (**_ngOnInit_**)
Podriamos crear una variable en nuestro then para que retenga la respuesta para poder imprimirla.

```
getUsuarios() {
    fetch('https://reqres.in/api/users').then((res) => console.log(res));
  }
```

Ahora, si vamos la respuesta por consola, vemos que, si, hay respuesta, aunque, no es muy sencilla de leer, para ello, para a extraer los elementos de notacion javascript mediante la funcion `json`

```
console.log(res.json())
```

Por consola, veremos que nos imprime que hay una promesa, y es que la funcion json es una promesa, por ello, agreguemos las sentencias que conocemos para manejar promesas.

```
console.log(res.json().then((data)=>console.log(data)))
```

Con esto, ya podemos ver la data que nos responde la pagina. Pero, nosotros solo queremos los usuarios, nada mas. Entonces manipulemos nuestra respuesta. Fijemonos que lo que estamos imprimiendo es un arreglo, y nuestros datos estan en la llave data `data.data`  
Ahora, ya teniendo claro que nuestra data esta en data.data retornemos a una variable esta data. Para ello, utilizaremos una Promesa!

```
getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users').then((res) =>
        console.log(res.json().then((data) => resolve(data.data)))
      );
    });

    return promesa;
  }
```

Ahora, tenemos que capturar lo que devuelve la funcion getUsuarios. Para ello, utilizaremos nuevamente la funcion then.

```
this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });

```

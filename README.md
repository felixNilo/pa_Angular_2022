# Programacion de aplicaciones 2022

## Un token sirve para verificar la sesion del usuario de forma pasiva

Un token basicamente es un string key que enlaza la sesion con un usuario de manera de disminuir la carga del servidor al mantener una sesion activa.

Revisemos como funciona en su pagina oficial -> jwt.io

El token posee un header, un payload y la firma, todo en forma de un string codificado. **OJO**, esta codificacion se puede decodificar en el cliente por lo que el payload debe ser informacion NO sensible, el nombre del usuario, el id, u otro. Ademas, debido a que la firma tambien se puede decodificar, esta debe contener un codigo secreto creado por nosotros de manera de que si alguien intenta decodificar ese numero secreto, este numero se encuentre cifrado en alguna otra base numerica.

### Partamos generando un token

Un token debe generarse en varios lugares, asi es que generaremos una funcion que entregue un token en un archivo compartido de nuestro servidor. De esta forma, crearemos una carpeta llamada helpers, dentro de ella estara el archivo jwt.js el cual contendra la importacion de jsonwebtoken y la generacion del token.
Primero, debemos instalar el paquete para que podamos consumir sus funciones y metodos. `npm install jsonwebtoken`.
Luego en nuestro archivo jwt.js generaremos el siguiente codigo.

```
const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  const payload = {
    uid,
  };
  jwt.sign(payload, JWT_SECRET);
};

```

Como mencionamos, debemos incluir algun codigo secreto que sea accesible solo por nosotros, por ello, iremos al nuestras variables de entorno para crear una clave secreta que sea accesible por el archivo jwt.js

`JWT_SECRET = HasfAASFlonong$594>?gajjgna@25fa?-`

Con esto, ya podemos acceder al codigo secreto. Podriamos indicar que el token cada 24 horas expire. Es importante saber que la funcion sign de jwt puede generar errores debido a desconecciones o que simplemente nuestro backend tenga en cola multiples solicitudes de generacion de tokens. Por ello, es recomendable que el generar token se realice dentro de promesas. Por ello, migraremos la funcion de generar tokens dentro del retorno de una promesa de manera de manejar errores y avisar cuando todo este okey.

```
const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
```

Recuerde exportar la funcion para que pueda ser usada desde algun controlador.

### Usemos nuestro generador de tokens

Desde la funcion de login en auth llamaremos a la funcion generarJWT y la entregaremos el id del usuario. Para verificar, podriamos imprimir el token en la respuesta http.

```
//Generar Token JWT
    const token = await generarJWT(usuarioDB._id);

    res.status(200).json({
      token,
    });
```

Entonces, luego de logearnos de forma correcta, se creara un token y lo podremos ver en postman. Este token podemos pegarlo en la pagina jwt.io para ver su contenido.

### Generemos un token al momento de crear el usuario

Al igual que cuando nos logeamos, queremos quedar logeados cuando creamos un usuarios, asi es que llamaremos a la funcion generar JWT al momento de crear un usuario en el controlador de crear usuario.

```
//Creando usuario en DB
    await usuario.save();

    //Generar Token JWT
    const token = await generarJWT(usuario._id);

    res.json({
      msje: "Usuario creado",
      usuario,
      token,
    });
```

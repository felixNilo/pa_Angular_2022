# Programacion de aplicaciones 2022

## Fijemonos en los datos que hemos guardado

Podemos ver que las contraseñas se encuentran visibles para aquellos que tengan acceso a manejar la base de datos. Es importante que las contraseñas y datos criticos se encuentren encriptadas.

### Encriptemos usando bcrypt

Instalemos bcrypt `npm install bcrypt`. Una vez instalada, importaremos el paquete desde el controlador. Luego, antes de guardar la data en la base de datos, realizaremos la encriptacion. Primero, generaremos una llave aleatoria para encriptar y desencriptar la contraseña y luego, aplicaremos la encriptacion entregando el dato a encriptar y la llave aleatoria.

```
const bcrypt = require("bcrypt");
...

const createUsuario = async (req, res = response) => {
    ...
    const usuario = new Usuario(req.body);

    //Encriptando contrasena
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    ...
  }
};

module.exports = { getUsuarios, createUsuario };
```

Borremos los usuarios que hemos creado desde mongoAtlas o compass, para crear un nuevo usuario de manejar de corroborar que la contraseña se encuentran encriptada.

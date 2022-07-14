# Programacion de aplicaciones 2022

## Nuestro backend

Nuestro sistema se ocupara de gestionar usuarios, medicos y hospitales. Ademas configuraremos el iniciar sesion con el email y pass de los usuarios o con los servicios de Google.
Tendremos los servicios de

1. Crear, leer, actualizar y borrar (CRUD) usuarios, medicos y hospitales
2. Buscador general e independiente
3. Carga de imagenes y archivos
4. Paginaciones
5. Bloqueo de imagenes
6. Generador de tokens
7. Verificacion de tokens
8. Validacion de token de Google

### Comencemos a ordenar nuestro directorio

Creemos una carpeta en nuestro directorio del backend llamado models, el cual contendra todos los modelos de nuestra aplicacion.
Dentro de ella, creemos un archivo llamado usuario.js
Mongoose nos da la posibilidad de crear esquemas y modelos de datos. Importemos estas dos funciones desde nuestro archivo usuario.js `const {Schema, model} = require('mongoose');`

Con el schema, indicamos los atributos que tendra cierto esquema de documento de mongo. En nuestro caso, un usuario debe tener nombre, email, contraseña, imagen y rol. Este usuario puede ser creado convencionalmente o a traves de una cuenta de google.

```
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});
```

Con esto, exportamos el modelo con su nombre y su esquema de datos.

` module.exports = model("Usuario", UsuarioSchema);`

# Programacion de aplicaciones 2022

## El controlador de peticion PUT de usuario esta muy extenso

Tratemos de ahorrar un par de lineas de codigo de manera de optimizar la estructura del controlador que actualiza un usuario.

1. El borrar se puede generar al momento de solicitar el paquete de campos del req.body
2. En vez de filtrar y borrar cuando el email sea igual, filtre y actualice cuando los emails sean distintos
3. Si lo anterior no ocurre, entregue el valor del email a usuario.email para que se actualice el usuario.

```
//Separar password, google y email de campos y almacenar los valores por separado
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      //El usuario esta cambiando su email
      //Verificar si el email que queremos ingresar no existe en la base de datos
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          msje: "Ya existe un usuario con el email",
        });
      }
    }

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
```

Con ello, hemos ahorrado unas lineas de codigo.

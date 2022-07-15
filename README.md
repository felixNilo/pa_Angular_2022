# Programacion de aplicaciones 2022

## Antes de eliminar, debemos destacar que...

Los datos son valiosos. Por ello, actualmente, el borrar datos desde bases de datos es una practica que esta quedando obsoleta, mas bien, los datos dejan de estar activos. Aunque, es importante que se conozca la forma en que se genera la funcion de borrar en mongoose.

### Deberiamos borrar por id

Al igual que en la peticion POST, deberiamos entregar la id del usuario a borrar por la url, entonces, generemos la ruta:
`router.delete("/:id", borrarUsuario); `

Tal como en el caso de la peticion put, debemos crear y exportar la funcion borrarUsuario y extraer el id de la peticion.

```
const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    res.status(200).json({
      uid,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error inesperado al borrar",
    });
  }
};
```

Tal como en casos anteriores, primero verificamos si el usuario existe en el base de datos, si no existe respondemos con un error y si existe lo borramos.

```
try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        msje: "Usuario creado",
        msje: "No existe un usuario con la id proporcionada",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.status(200).json({
      msje: "Usuario borrado",
    });
  }
```

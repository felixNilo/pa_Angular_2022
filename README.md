# Programacion de aplicaciones 2022

## Terminaremos de crear el controlador get de usuarios

Para ello, instanciamos una variable con el modelo Usuario que hemos creado, y con ella, usamos la funcion `find` de mongoose.

` const usuarios = Usuario.find();`

Al igual que los casos anteriores, find() toma tiempo para ejecutarse, asi es que, la funcion que contenga find debera ser asincrona para que al ejecutar find esperemos a que termine para seguir con la siguiente linea de codigo.

```
const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();

  res.json({
    msje: "usuarios",
    usuarios,
  });
```

Esto nos devuelve todas las llaves de todos los documentos en la coleccion usuarios. Podriamos filtrar en find los datos que queremos mediante `const usuarios = await Usuario.find({}, "nombre"); ` el cual, solo nos devolvera el nombre y el id del documento.  
Podriamos agregar a nombre el email `const usuarios = await Usuario.find({}, "nombre email");`

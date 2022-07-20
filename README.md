# Programacion de aplicaciones 2022

## Nos interiorizaremos con el metodo populate de mongoose

Primero, creemos el controlador que devuelve todos los hospitales suponiendo que todo anda bien en terminos de las validaciones. Es decir, vamos directo al grano.

```
const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find();
  res.status(200).json({
    msje: "getHospitales",
    hospitales,
  });
};
```

Con esto, deberiamos poder obtener una respuesta http con todos los hospitales y sus respectivas llaves. Ahora, supongamos que queremos ver a que usuario corresponde el id del usuario mediante: ` const hospitales = await Hospital.find().populate("usuario", "nombre");`.
Tambien podriamos agregar alguna otra llave del usuario: `const hospitales = await Hospital.find().populate("usuario", "nombre email");`  
Si bien, el email no nos sirve mucho, podriamos devolver la imagen del usuario, aunque, aun no hemos creado dicha llave en los documentos de usuario de mongoDB.

### Repeat to learn

Realicemos lo mismo con medicos, pero esta vez, debemos llamar a la funcion populate dos veces, ya que debemos imprimir el usuario que creo el medico y el hospital al que pertenece.

```
const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre")
    .populate("hospital", "nombre");
  res.status(200).json({
    msje: "getMedicos",
    medicos,
  });
};
```

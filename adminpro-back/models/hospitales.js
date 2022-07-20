const { Schema, model } = require("mongoose");

const HospitalesSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "hospitales" }
);

module.exports = model("Hospital", HospitalesSchema);

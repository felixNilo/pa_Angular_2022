const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mean_user:vKFPXQVGekO0oXYY@cluster0.sajs8.gcp.mongodb.net/test"
    );
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha conectado a la DB");
  }
};
module.exports = {
  dbConnection,
};

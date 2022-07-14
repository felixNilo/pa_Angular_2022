const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
    throw new Error("No se conecto a la DB");
  }
};
module.exports = {
  dbConnection,
};

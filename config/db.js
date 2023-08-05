const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log(
      ` Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(` Mongo connect error`.bgRed.white);
  }
};

module.exports = connectDb;

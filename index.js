const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const connectDb = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

app.listen(PORT, () => {
  console.log(
    ` Server is running in ${process.env.DEV_MODE} on port no. ${PORT} `.bgCyan
      .white
  );
});

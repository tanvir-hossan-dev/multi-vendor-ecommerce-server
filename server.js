require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const rootRouter = require("./routers/index");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(rootRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    app.listen(4000, () => {
      console.log("Port 4000 is running");
    });
  })
  .catch((err) => {
    console.log("Mongoose Error!");
  });

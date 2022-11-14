import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.url, encoded());
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

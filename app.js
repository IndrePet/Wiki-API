import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.url, encoded());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = new mongoose.model("Article", articleSchema);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = new mongoose.model("Article", articleSchema);

/*
Requests targeting all articles
*/

app
  .route("/articles")
  .get((_req, res) => {
    Article.find((err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added a new article");
      }
    });
  })
  .delete((_req, res) => {
    Article.deleteMany(err => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted all the articles");
      }
    });
  });

/* 
Requests targeting specific article
*/

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
      if (!err) {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No articles found with that title");
        }
      } else {
        res.send(err);
      }
    });
  })
  .put((req, res) => {
    const updatedArticle = {
      title: req.body.title,
      content: req.body.content,
    };
    Article.updateOne(
      { title: req.params.articleTitle },
      updatedArticle,
      err => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated article");
        }
      }
    );
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      err => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated article");
        }
      }
    );
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

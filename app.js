const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store the to-do items
const todos = [];

app.get("/", (req, res) => {
  res.render("index", { todos: todos });
});

app.post("/add", (req, res) => {
  const newTodo = req.body.newTodo;
  todos.push(newTodo);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

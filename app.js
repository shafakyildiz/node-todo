const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const fs = require("fs");

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

fs.readFile("todo.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  // Now you have the file content in the 'data' variable
  // You can edit 'data' here
  console.log(data);
});

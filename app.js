const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store the to-do items
let todos = [];
var todoId = 0;

app.get("/", (req, res) => {
  res.render("index", { todos: todos });
});

app.post("/add", (req, res) => {
  todoId++;
  const newTodo = req.body.newTodo;
  let isCompleted = false;
  let todoItem = { todoId: todoId, newTodo: newTodo, isCompleted: isCompleted };

  addTodo(todoItem);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

readFile = () => {
  fs.readFile("todo.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    // Now you have the file content in the 'data' variable
    // You can edit 'data' here
    console.log(data);
  });
};

readFile();

addTodo = (todoItem) => {
  fs.readFile("todo.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    data += `${todoItem.todoId.toString()} ${todoItem.newTodo} ${
      todoItem.isCompleted
    }\n`;

    fs.writeFile("todo.txt", data, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      console.log("File updated successfully");
    });
  });
};

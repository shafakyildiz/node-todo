const express = require("express");
const fs = require("fs");
const readline = require("readline");

const app = express();
app.listen(3000, () => {});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askUser() {
  rl.question('Enter something (or type "q" to quit): ', (answer) => {
    if (answer.toLowerCase() === "q") {
      rl.close(); // Close the readline interface to exit the program
    } else {
      console.log(`You entered: ${answer}`);

      // Array to store the to-do items
      let todos = [];
      var todoId = 0;
      var args = answer.split(" ").slice(2);
      console.log(args);
      // Operations
      const ADD = "add";
      const LIST = "list";
      const EDIT = "edit";
      const COMPLETE = "complete";
      const SEARCH = "search";

      let operation = args[0];
      let secondArg = args[1];

      readFile = () => {
        fs.readFile("todo.json", "utf8", (err, data) => {
          if (err) {
            console.error("Error reading the file:", err);
            return;
          }
          // Now you have the file content in the 'data' variable
          // You can edit 'data' here
        });
      };

      const addTodo = () => {
        todoId = Math.floor(Math.random() * 1000) + 1;
        const newTodo = args[1];
        let isCompleted = "Incomplete";
        let todoItem = {};
        if (newTodo) {
          todoItem = {
            todoId: todoId,
            newTodo: newTodo,
            isCompleted: isCompleted,
          };
          todos.push(todoItem);
        } else {
          console.log("todo item cannot be empty");
        }

        // Convert the JSON object to a JSON string
        const jsonString = JSON.stringify(todoItem, null, 2); // The `null, 2` parameters format the JSON with 2 spaces for indentation

        fs.writeFile("todo.json", jsonString, "utf8", (err) => {
          if (err) {
            console.error("Error writing to the file:", err);
            return;
          }
          console.log("File updated successfully");
        });
      };

      const listTodo = () => {
        readFile();
        // Read the JSON file
        const jsonFileContents = fs.readFileSync("todo.json", "utf8");
        // Parse the JSON content into a JavaScript object
        const jsonData = JSON.parse(jsonFileContents);
        if (secondArg === "complete") {
          let filtered = jsonData.filter((x) => x.isCompleted === "Completed");
          console.log(filtered);
        } else if (secondArg === "incomplete") {
          let filtered = jsonData.filter((x) => x.isCompleted === "Incomplete");
          console.log(filtered);
        } else {
          console.log(jsonData);
        }
      };

      const editTodo = () => {
        readFile();
      };

      const completeTodo = () => {
        readFile();
      };

      const searchTodo = () => {
        readFile();
      };

      switch (operation) {
        case ADD:
          addTodo();
          break;
        case LIST:
          listTodo();
          break;
        case EDIT:
          editTodo();
          break;
        case COMPLETE:
          completeTodo();
          break;
        case SEARCH:
          searchTodo();
          break;
      }

      askUser(); // Ask the user again
    }
  });
}

askUser(); // Start the input loop

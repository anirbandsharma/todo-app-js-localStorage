//selectors
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", action);


//functions
function addTodo(event) {
  event.preventDefault();
  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");
  const newLi = document.createElement("li");
  newLi.innerText = todoInput.value;
  newDiv.appendChild(newLi);
  //Save to local storage
  saveLocalTodos(todoInput.value);
  //create check button
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check");
  checkBtn.innerText = "Done";
  newDiv.appendChild(checkBtn);
  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "Delete";
  newDiv.appendChild(deleteBtn);
  //appent new div
  todoList.appendChild(newDiv);
  //clear input
  todoInput.value = "";
}

function action(e) {
  const item = e.target;
  //delete action
  if (item.classList[0] === "delete") {
    const todo = item.parentElement;
    todo.classList.add("deleted");
    //remove from local storage
    removeLocalTodos(todo);
    //then
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  //checked action
  if (item.classList[0] === "check") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//local storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
 //get from local storage 
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("todo");
        const newLi = document.createElement("li");
        newLi.innerText = todo;
        newDiv.appendChild(newLi);
        //create check button
        const checkBtn = document.createElement("button");
        checkBtn.classList.add("check");
        checkBtn.innerText = "Done";
        newDiv.appendChild(checkBtn);
        //create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerText = "Delete";
        newDiv.appendChild(deleteBtn);
        //appent new div
        todoList.appendChild(newDiv);
    });
  }
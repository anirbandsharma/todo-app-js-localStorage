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
  saveLocalTodos(todoInput.value,"uncompleted");
  //create edit button
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerText = "Edit";
  newDiv.appendChild(editBtn);
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
  //edit action
  if (item.classList[0] === "edit") {
    const todo = item.parentElement;
    todo.classList.add("edited");
    todoInput.value=todo.children[0].innerText
    //remove from local storage
    removeLocalTodos(todo);
    //then
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
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
    if(todo.classList.contains("completed")){
      todo.classList.remove("completed");
      todos = JSON.parse(localStorage.getItem("todos"));
      const todoIndex = todo.children[0].innerText+':completed';
     
      todos[todos.indexOf(todoIndex)]=todo.children[0].innerText+':uncompleted';
      localStorage.setItem("todos", JSON.stringify(todos));
     
  }else{
    todo.classList.add("completed");
    todos = JSON.parse(localStorage.getItem("todos"));
    const todoIndex = todo.children[0].innerText+':uncompleted';
  
    todos[todos.indexOf(todoIndex)]=todo.children[0].innerText+':completed';
    localStorage.setItem("todos", JSON.stringify(todos));
   
  }
  }
}

//local storage
function saveLocalTodos(todo,check) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo+':'+check);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //remove local storage
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    if(todo.classList.contains("completed")){
    const todoIndex = todo.children[0].innerText+':completed';;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    }else{
      const todoIndex = todo.children[0].innerText+':uncompleted';;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    }
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
      newLi.innerText = todo.split(":")[0];
      newDiv.appendChild(newLi);
     
      if(todo.split(":")[1]=="completed"){
        newDiv.classList.add("completed");
      }

      //create edit button
      const editBtn = document.createElement("button");
      editBtn.classList.add("edit");
      editBtn.innerText = "Edit";
      newDiv.appendChild(editBtn);
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
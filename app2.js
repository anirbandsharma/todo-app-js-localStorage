//selectors
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", action);

let allData = [];

//functions
function addTodo(event) {
  event.preventDefault();
  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");
  const newLi = document.createElement("li");
  newLi.innerText = todoInput.value;
  newDiv.appendChild(newLi);

  //Save to local storage
  // saveLocalTodos(todoInput.value,"uncompleted");

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

  //local storage
 if (localStorage.getItem("storage") === null) {
    allData = [];
  } else {
    allData = JSON.parse(localStorage.getItem("storage"));
  }
  const data = { text: todoInput.value, check: 0 };
  allData.push(data);
  localStorage.setItem("storage", JSON.stringify(allData));

  //clear input
  todoInput.value = "";

  console.log(localStorage.getItem("storage"));
}

function action(e) {
  const item = e.target;
  //edit action
  if (item.classList[0] === "edit") {
    const todo = item.parentElement;
    todo.classList.add("edited");
    todoInput.value = todo.children[0].innerText;

    //remove from local storage
    removeLocalTodos(todo);
    //then
    todo.addEventListener("transitionend", (e) => {
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
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
  //checked action
  if (item.classList[0] === "check") {
    const todo = item.parentElement;

    if (localStorage.getItem("storage") === null) {
      allData = [];
    } else {
      allData = JSON.parse(localStorage.getItem("storage"));
    }

    if (todo.classList.contains("completed")) {
      todo.classList.remove("completed");
      const index = allData.findIndex(
        (allData) => allData.text === todo.children[0].innerText
      );

      if (index > -1) {
        allData[index].check = 0;
      }
      localStorage.setItem("storage", JSON.stringify(allData));
    } else {
      todo.classList.add("completed");
      const index = allData.findIndex(
        (allData) => allData.text === todo.children[0].innerText
      );

      if (index > -1) {
        allData[index].check = 1;
      }

      localStorage.setItem("storage", JSON.stringify(allData));
    }
  }
}

// remove local storage
function removeLocalTodos(todo) {
  if (localStorage.getItem("storage") === null) {
    allData = [];
  } else {
    allData = JSON.parse(localStorage.getItem("storage"));
  }
  const index = allData.findIndex(
    (allData) => allData.text === todo.children[0].innerText
  );

  if (index > -1) {
    allData.splice(index, 1);
  }

  console.log(allData);

  localStorage.setItem("storage", JSON.stringify(allData));
}

//get from local storage
console.log(localStorage.getItem("storage"));
function getTodos() {
  let allData;
  if (localStorage.getItem("storage") === null) {
    allData = [];
  } else {
    allData = JSON.parse(localStorage.getItem("storage"));
  }
  allData.forEach(function (todo) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    const newLi = document.createElement("li");
    newLi.innerText = todo.text;
    newDiv.appendChild(newLi);

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

    if(todo.check == 1){
      newDiv.classList.add("completed");
    }

    //appent new div
    todoList.appendChild(newDiv);
  });
}

//Selectors
const inputTodo = document.querySelector(".input-todo")
const btnSubmitTodo = document.querySelector(".btn-submit-todo")
const todoList = document.querySelector(".todo-list")
const todoFilter = document.querySelector(".filter")

//Event Listeners
btnSubmitTodo.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteTodo)
todoFilter.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", loadTodosFromLocalStorage)

//Functions
function addTodo(event){
  //Prevent browser from refresh when form is being submitted
  event.preventDefault()

  //Prevent from submitting empty todo
  if(inputTodo.value === "")return
  
  //Create todo container for paragraph, check button, and trash button
  const todoItem = document.createElement("li")
  todoItem.classList.add("todo-item")
  //Create paragraph 
  const todoContent = document.createElement("p")
  todoContent.classList.add("todo-content")
  todoContent.innerText = inputTodo.value
  //Save todo to local storage
  saveLocalTodo(inputTodo.value)
  //Check and trash button
  const checkButton= document.createElement("button")
  checkButton.classList.add("check-btn")
  const trashButton = document.createElement("button")
  trashButton.classList.add("trash-btn")
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

  todoItem.append(todoContent, checkButton, trashButton)

  const todoList = document.querySelector(".todo-list")
  todoList.appendChild(todoItem)

  //Remove text from input tag when form already submit
  inputTodo.value = ""
}

function deleteTodo(event){
  //Store html tag that being clicked
  const item = event.target

  //Check if it is trash button
  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement
    todo.classList.add("falling")
    //Remove todo from localstorage
    deleteLocalTodo(todo)
    todo.addEventListener("transitionend", ()=>{todo.remove()})
  }

  //Check if it is check button
  if(item.classList[0] === "check-btn"){
    const todo = item.parentElement
    console.log(todo)
    //Using toggle so when parent tag already has class completed it will being removed
    todo.classList.toggle("completed")

    todo.children[0].setAttribute("completed", true)
    //Change attribute completed: true at object todos
    completeTodo(todo)
  }
}

function filterTodo(event){
  const todos = todoList.childNodes;
  
  todos.forEach(function(todo){
    switch(event.target.value){
      case "All":
        todo.style.display = "flex"
        break
      case "Done":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex"
        }
        else{
          todo.style.display = "none"
        }
        break
      case "Undone":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex"
        }
        else{
          todo.style.display = "none"
        }
        break
    }
  })
}

function saveLocalTodo(todo){
  //Check if the browser has localstorage or not
  if(!isStorageExist())return

  //Create array that will store data from local storage
  let todos = getTodosFromLocalStorage()

  //Create object
  let todoObj = {todo: todo, completed: false}

  //Update todos array with todo that just being inserted from input tag
  todos.push(todoObj)
  //Create localstorage and save updated todos array inside local storage
  const STORAGE_KEY = "todos"
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function loadTodosFromLocalStorage(){
  //Check if browser has local storage
  if(!isStorageExist())return

  //Create array that will store data from local storage
  let todos = getTodosFromLocalStorage()

  //Render todolist for each item in todos array
  todos.forEach(function(todo){
    //Create todo container for paragraph, check button, and trash button
    const todoItem = document.createElement("li")
    todoItem.classList.add("todo-item")
    //Create paragraph 
    const todoContent = document.createElement("p")
    todoContent.classList.add("todo-content")
    todoContent.innerText = todo.todo
    //Check and trash button
    const checkButton= document.createElement("button")
    checkButton.classList.add("check-btn")
    const trashButton = document.createElement("button")
    trashButton.classList.add("trash-btn")
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

    todoItem.append(todoContent, checkButton, trashButton)

    if(todo.completed === true){
      todoItem.classList.add("completed")
    }

    //Show our DOM manipulation 
    const todoList = document.querySelector(".todo-list")
    todoList.appendChild(todoItem)
  })
}

function deleteLocalTodo(todo){
  console.log(todo)//<li class="todo-item"></li>
  console.log(todo.children) //HTML Collection (<p>, <button>, <button>)

  let todos = getTodosFromLocalStorage()
  console.log(todos)

  let updatedTodos = []

  //The text as a target to delete
  const todoText = todo.children[0].innerText
  todos.forEach(function(item){
    //push all item from todos to updatedTodos except for the one we want to delete
    if(item.todo !== todoText){
      updatedTodos.push(item)
    }
  })

  const STORAGE_KEY = "todos"
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos))
}

function isStorageExist(){
  if(typeof(Storage) !== undefined)return true
  else {
    alert("Your browser doesn't support web storage")
    return false
  }
}

function getTodosFromLocalStorage(){
  const STORAGE_KEY = "todos"
  //Return empty array when there is no localstorage yet
  if(localStorage.getItem(STORAGE_KEY) === null){
    return []
  }
  else{
    //Check with console the string that being stored in local storage
    console.log(localStorage.getItem(STORAGE_KEY))
    //Return array from localstorage to array todos (convert string to JSON using parse)
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  }
}

function completeTodo(todo) {
  let todos = getTodosFromLocalStorage()

  const todoText = todo.children[0].innerText;
  const hasCompletedClass = todo.classList.contains("completed");
  todos.forEach(function (innerTodo, index) {
    if (innerTodo.todo === todoText) {
      innerTodo.completed = hasCompletedClass;
      todos[index] = innerTodo;
    }
  });

  const STORAGE_KEY = "todos"
  localStorage.setItem("todos", JSON.stringify(todos));
}




// todos = [{todo: "mandi", completed: true}, {todo: "tidur", completed: false}, {todo: "makan", completed: true}]
// todos.forEach(function(innerTodo, index){
//   console.log(innerTodo)
//   console.log(index)
// });

//localStorage.clear()
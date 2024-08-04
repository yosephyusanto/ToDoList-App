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
    //Using toggle so when parent tag already has complete it will being removed
    todo.classList.toggle("completed")

    console.log(todo)
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

  //Update todos array with todo that just being inserted from input tag
  todos.push(todo)
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
    todoContent.innerText = todo
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
  })
}

function deleteLocalTodo(todo){
  console.log(todo)//<li class="todo-item"></li>
  console.log(todo.children) //HTML Collection (<p>, <button>, <button>)

  let todos = getTodosFromLocalStorage()
  console.log(todos)

  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex),  1)

  const STORAGE_KEY = "todos"
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
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

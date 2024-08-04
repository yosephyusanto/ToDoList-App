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
    const parent = item.parentElement
    parent.classList.add("falling")
    parent.addEventListener("transitionend", ()=>{parent.remove()})
  }

  //Check if it is check button
  if(item.classList[0] === "check-btn"){
    const parent = item.parentElement
    //Using toggle so when parent tag already has complete it will being removed
    parent.classList.toggle("completed")

    console.log(parent)
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

  //Create array that will be store into localstorage
  let todos;

  const STORAGE_KEY = "todos"
  //Create empty array when there is no localstorage yet
  if(localStorage.getItem(STORAGE_KEY) === null){
    todos = []
  }
  else{
    //Copy array from localstorage to array todos
    todos = JSON.parse(localStorage.getItem(STORAGE_KEY))
    console.log(localStorage.getItem(STORAGE_KEY))
  }
  
  //Update todos array with todo that just being inserted from input tag
  todos.push(todo)
  //Create localstorage and save updated todos array inside local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function loadTodosFromLocalStorage(){
  //Check if browser has local storage
  if(!isStorageExist())return

  //Create array that will be store into localstorage
  let todos;

  const STORAGE_KEY = "todos"
  //Create empty array when there is no localstorage yet
  if(localStorage.getItem(STORAGE_KEY) === null){
    todos = []
  }
  else{
    //Copy array from localstorage to array todos
    todos = JSON.parse(localStorage.getItem(STORAGE_KEY))
    console.log(localStorage.getItem(STORAGE_KEY))
  }

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

function deleteLocalTodo(){

}

function isStorageExist(){
  if(typeof(Storage) !== undefined)return true
  else {
    alert("Your browser doesn't support web storage")
    return false
  }
}

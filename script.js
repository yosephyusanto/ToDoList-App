//Selectors
const inputTodo = document.querySelector(".input-todo")
const btnSubmitTodo = document.querySelector(".btn-submit-todo")
const todoList = document.querySelector(".todo-list")
const todoFilter = document.querySelector(".filter")

//Event Listeners
btnSubmitTodo.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteTodo)
todoFilter.addEventListener("click", filterTodo)


//Functions
function addTodo(event){
  //Prevent browser from refresh when form is being submitted
  event.preventDefault()
  
  const todoItem = document.createElement("li")
  todoItem.classList.add("todo-item")

  const todoContent = document.createElement("p")
  todoContent.classList.add("todo-content")
  todoContent.innerText = inputTodo.value
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


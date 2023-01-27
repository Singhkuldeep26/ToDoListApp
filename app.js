
//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", buttonFunction);
filterOption.addEventListener("click", filterTodo);

//Functions
//creating addTodo function 
function addTodo(event) {
    if (todoInput.value == "") {
        return alert("Input Box can not be empty!");
    }
    //preventing form from submitting 
    event.preventDefault();
    //creating new div
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    //creating LI 
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item');
    //appending to newly created todo list to div
    newDiv.appendChild(newTodo);

    //creating check mark button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    newDiv.appendChild(checkButton);

    //creating delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    newDiv.appendChild(deleteButton);

    //Append to list 
    todoList.appendChild(newDiv);

    //after submitting input text, clear the left text Todo INPUT VALUE
    todoInput.value = "";

}
// creating buttonFunction function 
// e object is targeting to the li, check Btn, delete btn as we appended it to the todoList after creating in js 
function buttonFunction(e) {
    const item = e.target;
    //item contain 3 target elements li,check-btn,delete-btn

    //Delete operation
    if (item.classList[0] === "delete-btn") // if any one of the above matches then it will enter inside the if body
    {
        // item's parent is assigned todo i.e newDiv and removed together
        //basically here we are removing the newDiv 
        const todo = item.parentElement;
        //creating new class to add some animation 
        todo.classList.add('fall-down');

        // todo.remove(); if we keep this todo.remove here inside the body then the above effect won't be seen as it deletes/fades immediately

        todo.addEventListener("transitionend", function () { //transitionend is applied bcos once the above transition is end then automatically further function will run
            todo.remove();
        });
    }
    //check operation
    if (item.classList[0] == "check-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("check");
        // we added toggle effect to this todo newDiv toggle means it accepts multiple click
    }
}
//creating filter function
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("check")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("check")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

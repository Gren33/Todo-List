// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(e) {
    //Prevent form from submitting
    e.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create li
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);

    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //CHECK MARK
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //TRASH
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT Value;
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;
    //Delete TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo)
        // todo.remove();
        todo.addEventListener('transitionend', function (){
            todo.remove();
        })
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                } 
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }  
                break;
                     
        }
    });
}

function saveLocalTodos(todo){
    // CHECK--- HEY Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        //CHECK MARK
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //TRASH
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todoItem){
    // CHECK--- HEY Do I already have thing in there?
   let todos;
   if(localStorage.getItem('todos') === null){
       todos = [];
   } else {
       todos = JSON.parse(localStorage.getItem('todos'));
   }
    todos.forEach(function(todo, index){
    if(todoItem.textContent === todo){
        todos.splice(index, 1);
    }
   });
   localStorage.setItem('todos', JSON.stringify(todos));
  
}
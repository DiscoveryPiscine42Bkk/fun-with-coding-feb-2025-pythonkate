document.addEventListener('DOMContentLoaded', () => {
    
    loadTodos();

    
    document.getElementById('new-todo-button').addEventListener('click', () => {
        let newTodoText = prompt("Enter new to-do:");
        if (newTodoText && newTodoText.trim() !== "") {
            addTodo(newTodoText.trim());
        }
    });
});


function loadTodos() {
    let todos = getCookie('todos');
    if (todos) {
        todos = JSON.parse(todos);
        todos.forEach(todo => addTodoElement(todo));
    }
}


function saveTodos() {
    const todos = [];
    const todoElements = document.querySelectorAll('#ft_list > div');
    todoElements.forEach(todoElement => {
        todos.push(todoElement.innerText);
    });
    setCookie('todos', JSON.stringify(todos), 365); // Save for 365 days
}


function addTodo(text) {
    addTodoElement(text);
    saveTodos(); // Save the updated list to cookies
}


function addTodoElement(text) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');
    todoDiv.innerText = text;

    
    todoDiv.addEventListener('click', () => {
        const remove = confirm('Do you want to remove this TO DO?');
        if (remove) {
            todoDiv.remove();
            saveTodos(); 
        }
    });

   
    const todoList = document.getElementById('ft_list');
    todoList.insertBefore(todoDiv, todoList.firstChild);
}


function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookies = decodedCookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

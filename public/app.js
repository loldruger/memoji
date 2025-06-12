document.addEventListener('DOMContentLoaded', function() {
  const addTodoForm = document.getElementById('add-todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Key for localStorage
  const TODOS_STORAGE_KEY = 'todos_data';

  // Load todos from localStorage
  function getTodos() {
    const todos = localStorage.getItem(TODOS_STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  }

  // Save todos to localStorage
  function saveTodos(todos) {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }

  // Render all todos to the DOM
  function renderTodos() {
    // Clear the current list
    todoList.innerHTML = '';
    const todos = getTodos();
    todos.forEach((todoText, index) => {
      createTodoElement(todoText, index);
    });
  }

  // Create and append a single todo element
  function createTodoElement(text, index) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = text;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '–'; // Using a minus sign for a cleaner look
    deleteButton.onclick = function() {
      removeTodo(index);
    };
    
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }

  // Add a new todo
  function addTodo(text) {
    const todos = getTodos();
    todos.push(text);
    saveTodos(todos);
    renderTodos(); // Re-render the list
  }

  // Remove a todo by its index
  function removeTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1); // Remove the item at the given index
    saveTodos(todos);
    renderTodos(); // Re-render the list
  }

  // Handle form submission
  addTodoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTodoText = todoInput.value.trim();

    if (newTodoText !== '') {
      addTodo(newTodoText);
      todoInput.value = '';
      todoInput.focus();
    }
  });

  // Initial render when the page loads
  renderTodos();
});

const form = document.querySelector('form');
const inputText = document.querySelector('#inputText');
const todoList = document.querySelector('ul');
const itemsLeft = document.querySelector('#itemsLeft');
const buttonsToHide = document.querySelectorAll('.hide');
const allButton = document.querySelector('#all');
const activeButton = document.querySelector('#active');
const completedButton = document.querySelector('#completed');
const clearCompletedButton = document.querySelector('#clearCompleted');
const toggleAllCompleteButton = document.querySelector('#toggleAllBtn');

let todos = [];

form.onsubmit = event => {
  event.preventDefault();

  const todo = {
    title: inputText.value,
    isCompleted: false
  }

  todos.push(todo);
  inputText.value = '';

  displayTodos();
}

// renders the updated todo list
function displayTodos(displayOption = 'all') {
  todoList.textContent = '';
  let todosTemp;

  if (displayOption === 'active') {
    todosTemp = todos.filter(t => !t.isCompleted);
  }
  else if (displayOption === 'completed') {
    todosTemp = todos.filter(t => t.isCompleted);
  }
  else {
    todosTemp = todos
  }

  for (let i = 0; i < todosTemp.length; i++) {
    const todoItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todosTemp[i].isCompleted;
    checkbox.onclick = () => { toggleComplete(i) };
    checkbox.setAttribute('id', 'todoCompleted' + (i + 1));

    const title = document.createElement('label');
    title.textContent = todosTemp[i].title;
    title.setAttribute('id', 'todoTitle' + (i + 1));

    const container = document.createElement('div');
    container.appendChild(checkbox);
    container.appendChild(title);

    const remove = document.createElement('label');
    remove.textContent = '❌';
    remove.onclick = () => { removeTodo(i) };
    remove.setAttribute('class', 'removeTodo');

    todoItem.appendChild(container);
    todoItem.appendChild(remove);

    todoList.appendChild(todoItem);
  }

  setActiveButton(displayOption);
  updateItemsLeft();
  toggleVisibility();
}

function setActiveButton(displayOption) {
  if (displayOption === 'active') {
    allButton.removeAttribute('class');
    completedButton.removeAttribute('class');
    activeButton.setAttribute('class', 'selected');
  }
  else if (displayOption === 'completed') {
    allButton.removeAttribute('class');
    activeButton.removeAttribute('class');
    completedButton.setAttribute('class', 'selected');
  }
  else {
    activeButton.removeAttribute('class');
    completedButton.removeAttribute('class');
    allButton.setAttribute('class', 'selected');
  }
}

function updateItemsLeft() {
  let count = 0;

  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].isCompleted) {
      count++;
    }
  }

  if (count != 1) {
    itemsLeft.textContent = count + ' items left'
  }
  else {
    itemsLeft.textContent = '1 item left'
  }
}

function toggleComplete(index) {
  // inverts the isCompleted boolean
  todos[index].isCompleted = !todos[index].isCompleted;
  displayTodos();
}

function toggleAllComplete() {
  let allCompleted = todos.every(todo => todo.isCompleted);
  if (allCompleted) {
    todos.forEach(t => t.isCompleted = false);
  }
  else {
    todos.forEach(t => t.isCompleted = true);
  }

  displayTodos();
}

function removeTodo(index) {
  todos.splice(index, 1);
  displayTodos();
}

function clearCompletedTodos() {
  // replaces current todos with only the todos that are not completed
  todos = todos.filter(t => !t.isCompleted);
  displayTodos();
}

function toggleVisibility() {
  // hides elements that should be hidden when there are no todos
  if (todos.length > 0) {
    buttonsToHide.forEach(e => e.style.display = 'block');
  }
  else {
    buttonsToHide.forEach(e => e.style.display = 'none');
  }

  // hides clear completed button
  if (todos.some(t => t.isCompleted)) {
    clearCompletedButton.style.visibility = 'visible';
  }
  else {
    clearCompletedButton.style.visibility = 'hidden';
  }

  // sets toggle all opacity button to 100% if all todos are completed 
  if (todos.every(t => t.isCompleted)) {
    toggleAllCompleteButton.style.opacity = '100%';
  }
  else {
    toggleAllCompleteButton.style.opacity = '50%';
  }

  // hides toggle all button if there are no todos
  if (todos.length === 0) {
    toggleAllCompleteButton.style.visibility = 'hidden';
  }
  else {
    toggleAllCompleteButton.style.visibility = 'visible';
  }
}
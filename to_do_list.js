let textInput = document.getElementById('text-input');
let submitButton = document.getElementById('submit-button');
let clearListButton = document.getElementById('clear-list-button');
let listOfTodos = document.getElementById('list-of-todos');
let todoIndex = 0;

submitButton.addEventListener('click', addTodo);
clearListButton.addEventListener('click', clearList);

function addTodo() {
	let content = textInput.value;
	listOfTodos.innerHTML += '<div class="todo-box">' + content + '</div>'
	console.log(content);
}

function clearList() {
	listOfTodos.innerHTML = ' ';
}
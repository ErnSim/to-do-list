let textInput = document.getElementById('text-input');
let submitButton = document.getElementById('submit-button');
let clearListButton = document.getElementById('clear-list-button');
let listOfTodos = document.getElementById('list-of-todos');
let todoIndex = 0;

submitButton.addEventListener('click', addTodo);
clearListButton.addEventListener('click', clearList);

//////////////////////////////////////////////////////////////////////////////////////////////////

function addTodo() {
	let content = textInput.value;

	if (content != "") {
		listOfTodos.innerHTML += "<div id='index-" + todoIndex + "' class='task-box'> <input type='checkbox' id=''> <p>" + content + "</p> <div class='remove-task-button' onclick='removeTask(" + todoIndex + ")'>remove task</div> </div>"
		todoIndex++;
		console.log(content);
	}
}

function clearList() {
	listOfTodos.innerHTML = ' ';
}

function removeTask(index) {
	console.log('index-' + index);
	document.getElementById('index-' + index).remove();
}
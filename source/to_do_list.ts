// Inital tasks (localStorage in the future)
let Task = [
	{
		"id": 0,
		"isCheck": true,
		"content": "Coś tam bredzę sobie"
	},
	{
		"id": 1,
		"isCheck": false,
		"content": "Abba ojcze"
	},
	{
		"id": 2,
		"isCheck": false,
		"content": "siema"
	},
	{
		"id": 5,
		"isCheck": true,
		"content": "papiesz wapiesz"
	},
	{
		"id": 7,
		"isCheck": true,
		"content": "boli mnie coś"
	}
]

// Declare variables
let textInput = document.querySelector('#text-input')!;
let submitButton = document.querySelector('#submit-button')!;
let clearListButton = document.querySelector('#clear-list-button')!;
let listOfTodos = document.querySelector('#list-of-todos')!;
let taskIndex = Task[Task.length - 1].id;

// Execute functions
loadTheTasks();
submitButton.addEventListener('click', addTodo);
clearListButton.addEventListener('click', clearList);
// changeCheckboxCheck();
// removeTaskFromArray();

//////////////////////////////////////////////////////////////////////////////////////////////////

function loadTheTasks(){
	for (let i = 0; i < Object.keys(Task).length; i++) {

		if (Task[i]["isCheck"]) {
			listOfTodos.innerHTML += `
				<div id="index-${ Task[i].id }" class="task-box">
					<input type="checkbox" id="checkbox-${ i }" checked>
					<p> ${ Task[i].content } </p>
					<div class="remove-task-button no-select" onclick="removeTask(${ Task[i].id })">🗑️ remove task</div>
				</div>`;
		}
		else {
			listOfTodos.innerHTML += `	
			<div id="index-${ Task[i].id }" class="task-box">
				<input type="checkbox" id="checkbox-${ i }">
				<p> ${ Task[i].content } </p>
				<div class="remove-task-button no-select" onclick="removeTask(${ Task[i].id })">🗑️ remove task</div>
			</div>`;
		}
	}
}

function addTodo() {
	let content = textInput.value;

	if (content != "") {
		taskIndex++;
		listOfTodos.innerHTML += `	
			<div id="index-${ taskIndex }" class="task-box">
				<input type="checkbox" id="checkbox-${ taskIndex }">
				<p> ${ content } </p>
				<div class="remove-task-button no-select" onclick="removeTask(${ taskIndex })">🗑️ remove task</div>
			</div>`;
		
		// push to the Task[]
		Task.push({
			"id": taskIndex,
			"isCheck": false,
			"content": content
		})
	}
}

function clearList() {
	listOfTodos.innerHTML = ' ';
	Task = [];
	return taskIndex = 0;
}

function removeTask(index:number) {		// onclick="removeTask(i)"
	console.log('index-' + index);
	document.getElementById('index-' + index)!.remove();
}
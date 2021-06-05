// Inital tasks (localStorage in the future)
//let Task:{ id:number, isCheck:boolean, content:string}[] = [];
let Task:{
	id:number, 
	isCheck:boolean, 
	content:string}[] = [];


Task = [
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
let taskIndex:number;
if (Task.length === undefined) {
	taskIndex = 0;
}
else{
	taskIndex = Task[Task.length - 1].id;
}

// Execute functions
loadTheTasks();
submitButton.addEventListener('click', addTask);
clearListButton.addEventListener('click', clearList);
setInterval(changeContentOnOrientation,100);		// zamienić na document.querySelectorAll('.remove-task-button')
//lineThroughTask();

//////////////////////////////////////////////////////////////////////////////////////////////////

function loadTheTasks(){
	for (let i = 0; i < Object.keys(Task).length; i++) {

		if (Task[i]["isCheck"]) {
			listOfTodos.innerHTML += `
				<div id="index-${ Task[i].id }" class="task-box">
					<input type="checkbox" id="checkbox-${ Task[i].id }" onclick="lineThroughTask(${ Task[i].id })" checked>
					<p> ${ Task[i].content } </p>
					<div class="remove-task-button no-select" onclick="removeTask(${ Task[i].id })">🗑️ remove task</div>
				</div>`;
		}
		else {
			listOfTodos.innerHTML += `	
			<div id="index-${ Task[i].id }" class="task-box">
				<input type="checkbox" id="checkbox-${ Task[i].id }" onclick="lineThroughTask(${ Task[i].id })">
				<p> ${ Task[i].content } </p>
				<div class="remove-task-button no-select" onclick="removeTask(${ Task[i].id })">🗑️ remove task</div>
			</div>`;
		}

		lineThroughTask(Task[i].id);
	}
	console.log('loadTheTask() | Wczytano pomyślnie');
}

function addTask() {
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
	console.log(`addTask() | Dodano zadanie o indexie: ${ taskIndex }`);
}

function clearList() {
	listOfTodos.innerHTML = ' ';
	Task = [];
	console.log(`clearList() | Wyczyszczono listę zadań`)
	return taskIndex = 0;
}

function removeTask(index:number) {		// onclick="removeTask(i)"
	document.getElementById('index-' + index)!.remove();
	console.log(`removeTask(${ index }) | Usunięto zadanie o indexie: ${ index }`);
	removeTaskFromArray(index);
}

function removeTaskFromArray(index:number){			// poprawić nie działa do końca poprawnie
	let TmpArray = [];
	let tmpValue:any;

	for (let i = 0; i <= index; i++) {
		tmpValue = Task.shift();
		TmpArray.push(tmpValue);
	}
	TmpArray.pop();
	for (let i = 0; i <= index - 1; i++) {
		tmpValue = TmpArray.pop();
		Task.unshift(tmpValue);
	}
}

function changeContentOnOrientation() {
	if (window.matchMedia("(orientation: portrait)").matches) {
		// mobile mode
		let numberOfTasks = Object.keys(document.getElementsByClassName('remove-task-button')).length			// document.querySelectorAll('.remove-task-button')

		for (let i = 0; i < numberOfTasks; i++) {
			document.getElementsByClassName('remove-task-button')[i].innerHTML = "🗑️";
			document.getElementsByClassName("remove-task-button")[i].style.width = "2rem";
		}
		console.log(`changeContentOnOrientation() | Zmieniono na mobilną wersję`);
	}
	else {
		// desktop mode
		let numberOfTasks = Object.keys(document.getElementsByClassName('remove-task-button')).length

		for (let i = 0; i < numberOfTasks; i++) {
			document.getElementsByClassName('remove-task-button')[i].innerHTML = "🗑️ remove task";
			document.getElementsByClassName("remove-task-button")[i].style.width = "11rem";
		}
		console.log(`changeContentOnOrientation() | Zmieniono na desktopową wersję`);
	}
}

function lineThroughTask(index:number){
	if (document.querySelector(`#checkbox-${ index }`)!.checked) {
		document.querySelector(`#index-${ index } p`)!.style.textDecoration = "line-through";
		document.querySelector(`#index-${ index } p`)!.style.color = "rgba(0, 0, 0, 0.2)";
	}
	else{
		document.querySelector(`#index-${ index } p`)!.style.textDecoration = "none";
		document.querySelector(`#index-${ index } p`)!.style.color = "black";
	}
}
// Inital tasks (localStorage in the future)
//let Task:{ id:number, isCheck:boolean, content:string}[] = [];
let Task:{
	"id":number, 
	"isCheck":boolean, 
	"content":string}[] = [];

/*
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
*/

let textInput = document.querySelector('#text-input')!;
let submitButton = document.querySelector('#submit-button')!;
let clearListButton = document.querySelector('#clear-list-button')!;
let listOfTodos = document.querySelector('#list-of-todos')!;
let taskIndex:number;
if (Task.length === 0) {
	taskIndex = 0;
}
else{
	taskIndex = Task[Task.length - 1].id;
}

Task = JSON.parse(localStorage.getItem("TaskStorage"));
loadTheTasks();
submitButton.addEventListener('click', addTask);
clearListButton.addEventListener('click', clearList);
setInterval(changeContentOnOrientation,100);

//////////////////////////////////////////////////////////////////////////////////////////////////

function loadTheTasks(){
	if (Task !== null) {
		for (let i = 0; i < Task.length; i++) {
			if (Task[i]["isCheck"]) {
				listOfTodos.innerHTML += `
					<div id="index-${ Task[i].id }" class="task-box">
						<input type="checkbox" id="checkbox-${ Task[i].id }" onclick="changeCheckboxValue(${ Task[i].id })" checked>
						<p> ${ Task[i].content } </p>
						<div class="remove-task-button no-select" onclick="removeTask(${ Task[i].id })">🗑️ remove task</div>
					</div>`;
			}
			else {
				listOfTodos.innerHTML += `	
				<div id="index-${ Task[i].id }" class="task-box">
					<input type="checkbox" id="checkbox-${ Task[i].id }" onclick="changeCheckboxValue(${ Task[i].id })">
					<p> ${ Task[i].content } </p>
					<div class="remove-task-button no-select" onclick="removeTask(${ Task[i].id })">🗑️ remove task</div>
				</div>`;
			}
			changeCheckboxValue(Task[i].id);
		}
		console.log('loadTheTask() | Wczytano pomyślnie');
	}
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

		localStorage.setItem("TaskStorage", JSON.stringify(Task));
	}
	console.log(`addTask() | Dodano zadanie o indexie: ${ taskIndex }`);
}

function clearList() {
	listOfTodos.innerHTML = ' ';
	Task = [];
	localStorage.removeItem('TaskStorage');
	console.log(`clearList() | Wyczyszczono listę zadań`)
	return taskIndex = 0;
}

function removeTask(index:number) {		// onclick="removeTask(i)"
	document.getElementById('index-' + index)!.remove();
	console.log(`removeTask(${ index }) | Usunięto zadanie o indexie: ${ index }`);

	Task.splice(index,1);		// no poprawić to

	localStorage.setItem("TaskStorage", JSON.stringify(Task));
}

function changeContentOnOrientation() {
	if (window.matchMedia("(orientation: portrait)").matches) {
		// mobile mode
		let numberOfTasks = Object.keys(document.getElementsByClassName('remove-task-button')).length			//zamienić na document.querySelectorAll('.remove-task-button')

		for (let i = 0; i < numberOfTasks; i++) {
			document.getElementsByClassName('remove-task-button')[i].innerHTML = "🗑️";
			document.getElementsByClassName("remove-task-button")[i].style.width = "2rem";
		}
		//console.log(`changeContentOnOrientation() | Zmieniono na mobilną wersję`);
	}
	else {
		// desktop mode
		let numberOfTasks = Object.keys(document.getElementsByClassName('remove-task-button')).length

		for (let i = 0; i < numberOfTasks; i++) {
			document.getElementsByClassName('remove-task-button')[i].innerHTML = "🗑️ remove task";
			document.getElementsByClassName("remove-task-button")[i].style.width = "11rem";
		}
		//console.log(`changeContentOnOrientation() | Zmieniono na desktopową wersję`);
	}
}

function changeCheckboxValue(index:number){
	if (document.querySelector(`#checkbox-${ index }`)!.checked) {
		document.querySelector(`#index-${ index } p`)!.style.textDecoration = "line-through";
		document.querySelector(`#index-${ index } p`)!.style.color = "rgba(0, 0, 0, 0.2)";
		//Task[index].isCheck = true;
		localStorage.setItem("TaskStorage", JSON.stringify(Task));
	}
	else{
		document.querySelector(`#index-${ index } p`)!.style.textDecoration = "none";
		document.querySelector(`#index-${ index } p`)!.style.color = "black";
		//Task[index].isCheck = false;		// coś nie pyka
		localStorage.setItem("TaskStorage", JSON.stringify(Task));
	}
}
let TaskList:{"content":string, "isCheck":boolean}[] = [];

let submitButton = document.querySelector('#submit-button') as HTMLElement;
let clearListButton = document.querySelector('#clear-list-button') as HTMLElement;
let textInput = document.querySelector('#text-input') as HTMLElement;
let listOfTasks = document.querySelector('#list-of-todos') as HTMLElement;
let remainingTasks = document.querySelector('.remaining-tasks');
let infoSortBox = document.querySelector('.info-sort-box');

loadTaskList();
submitButton.addEventListener('click', addTask);
document.addEventListener('keydown', e => {
	if (e.key == 'Enter') addTask();
});
clearListButton.addEventListener('click', clearTaskList);
setInterval(changeContentOnOrientation, 50);
//document.querySelector('#sortSelect').addEventListener('change', sortTaskList);

///////////////////////////////////////////////////////////////////////////////////////////////

function loadTaskList(){
	listOfTasks.innerHTML = ' ';
	if (localStorage.getItem('TaskList') !== null) {
		TaskList = JSON.parse(localStorage.getItem('TaskList'));

		for (let i = 0; i < TaskList.length; i++) {
			if (TaskList[i].isCheck) {
					listOfTasks.innerHTML += `
				<div id="TaskIndex-${ i }" class="task-box">
					<input type="checkbox" id="checkbox-${ i }" onclick="changeCheckOnCheckbox(${ i })" checked>
					<p> ${ TaskList[i].content } </p>
					<div class="remove-task-button no-select" onclick="removeTask(${ i })">🗑️ remove task</div>
				</div>`
				document.querySelector(`#TaskIndex-${ i } p`)!.style.textDecoration = "line-through";
				document.querySelector(`#TaskIndex-${ i } p`)!.style.color = "rgba(0, 0, 0, 0.2)";
			}
			else{
					listOfTasks.innerHTML += `
				<div id="TaskIndex-${ i }" class="task-box">
					<input type="checkbox" id="checkbox-${ i }" onclick="changeCheckOnCheckbox(${ i })">
					<p> ${ TaskList[i].content } </p>
					<div class="remove-task-button no-select" onclick="removeTask(${ i })">🗑️ remove task</div>
				</div>`
				document.querySelector(`#TaskIndex-${ i } p`)!.style.textDecoration = "none";
				document.querySelector(`#TaskIndex-${ i } p`)!.style.color = "black";
			}
		}
	}
	loadInfo();
}

function addTask(){
	if (textInput.value !== '') {
		TaskList.push({
			"content": textInput.value,
			"isCheck": false
		})
		localStorage.setItem('TaskList', JSON.stringify(TaskList));
		loadTaskList();
	}
}

function removeTask(indexOfTask:number) {
	TaskList.splice(indexOfTask,1);
	localStorage.setItem('TaskList', JSON.stringify(TaskList));
	loadTaskList();
}

function clearTaskList(){
	listOfTasks.innerHTML = ' ';
	TaskList = [];
	localStorage.setItem('TaskList', JSON.stringify(TaskList));
	loadInfo();
}

function changeCheckOnCheckbox(indexOfCheckbox:number){
	if (document.querySelector(`#checkbox-${ indexOfCheckbox }`)?.checked) {
		document.querySelector(`#TaskIndex-${ indexOfCheckbox } p`)!.style.textDecoration = "line-through";
		document.querySelector(`#TaskIndex-${ indexOfCheckbox } p`)!.style.color = "rgba(0, 0, 0, 0.2)";
		TaskList[indexOfCheckbox].isCheck = true;
	}
	else{
		document.querySelector(`#TaskIndex-${ indexOfCheckbox } p`)!.style.textDecoration = "none";
		document.querySelector(`#TaskIndex-${ indexOfCheckbox } p`)!.style.color = "black";
		TaskList[indexOfCheckbox].isCheck = false;
	}
	localStorage.setItem('TaskList', JSON.stringify(TaskList));
}

function changeContentOnOrientation() {
	if (window.matchMedia("(orientation: portrait)").matches) {
		// mobile mode
		for (let i = 0; i < TaskList.length; i++) {
			document.querySelectorAll('.remove-task-button')[i].innerHTML = "🗑️";
			document.querySelectorAll('.remove-task-button')[i].style.width = "2rem";
		}
	}
	else {
		// desktop mode
		for (let i = 0; i < TaskList.length; i++) {
			document.querySelectorAll('.remove-task-button')[i].innerHTML = "🗑️ remove task";
			document.querySelectorAll('.remove-task-button')[i].style.width = "11rem";
		}
	}
}

function loadInfo(){
	let i = TaskList.length;

	if (i !== 0) {
		infoSortBox?.style.display = `flex`;
		infoSortBox?.innerHTML = `
			<div class="remaining-tasks">remaining tasks: ${ i }</div>
			<!--
			<div class="sort">
				<select name="mode" id="sortSelect">
					<option value="">All</option>
					<option value="">Completed</option>
					<option value="">Uncompleted</option>
				</select>
			</div>
			-->
		`
	}
	else{
		infoSortBox?.style.display = `none`;
	}
}
/*
function sortTaskList(){
	let selectedMode = document.querySelector('#sortSelect').selectedIndex;
	alert(selectedMode);
}
*/
"use strict";
let Task = [];
let textInput = document.querySelector('#text-input');
let submitButton = document.querySelector('#submit-button');
let clearListButton = document.querySelector('#clear-list-button');
let listOfTodos = document.querySelector('#list-of-todos');
let taskIndex;
if (Task.length === 0) {
    taskIndex = 0;
}
else {
    taskIndex = Task[Task.length - 1].id;
}
Task = JSON.parse(localStorage.getItem("TaskStorage"));
loadTheTasks();
submitButton.addEventListener('click', addTask);
clearListButton.addEventListener('click', clearList);
setInterval(changeContentOnOrientation, 100);
function loadTheTasks() {
    if (Task !== null) {
        for (let i = 0; i < Task.length; i++) {
            if (Task[i]["isCheck"]) {
                listOfTodos.innerHTML += `
					<div id="index-${Task[i].id}" class="task-box">
						<input type="checkbox" id="checkbox-${Task[i].id}" onclick="changeCheckboxValue(${Task[i].id})" checked>
						<p> ${Task[i].content} </p>
						<div class="remove-task-button no-select" onclick="removeTask(${Task[i].id})">🗑️ remove task</div>
					</div>`;
            }
            else {
                listOfTodos.innerHTML += `	
				<div id="index-${Task[i].id}" class="task-box">
					<input type="checkbox" id="checkbox-${Task[i].id}" onclick="changeCheckboxValue(${Task[i].id})">
					<p> ${Task[i].content} </p>
					<div class="remove-task-button no-select" onclick="removeTask(${Task[i].id})">🗑️ remove task</div>
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
			<div id="index-${taskIndex}" class="task-box">
				<input type="checkbox" id="checkbox-${taskIndex}">
				<p> ${content} </p>
				<div class="remove-task-button no-select" onclick="removeTask(${taskIndex})">🗑️ remove task</div>
			</div>`;
        Task.push({
            "id": taskIndex,
            "isCheck": false,
            "content": content
        });
        localStorage.setItem("TaskStorage", JSON.stringify(Task));
    }
    console.log(`addTask() | Dodano zadanie o indexie: ${taskIndex}`);
}
function clearList() {
    listOfTodos.innerHTML = ' ';
    Task = [];
    localStorage.removeItem('TaskStorage');
    console.log(`clearList() | Wyczyszczono listę zadań`);
    return taskIndex = 0;
}
function removeTask(index) {
    document.getElementById('index-' + index).remove();
    console.log(`removeTask(${index}) | Usunięto zadanie o indexie: ${index}`);
    Task.splice(index, 1);
    localStorage.setItem("TaskStorage", JSON.stringify(Task));
}
function changeContentOnOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        let numberOfTasks = Object.keys(document.getElementsByClassName('remove-task-button')).length;
        for (let i = 0; i < numberOfTasks; i++) {
            document.getElementsByClassName('remove-task-button')[i].innerHTML = "🗑️";
            document.getElementsByClassName("remove-task-button")[i].style.width = "2rem";
        }
    }
    else {
        let numberOfTasks = Object.keys(document.getElementsByClassName('remove-task-button')).length;
        for (let i = 0; i < numberOfTasks; i++) {
            document.getElementsByClassName('remove-task-button')[i].innerHTML = "🗑️ remove task";
            document.getElementsByClassName("remove-task-button")[i].style.width = "11rem";
        }
    }
}
function changeCheckboxValue(index) {
    if (document.querySelector(`#checkbox-${index}`).checked) {
        document.querySelector(`#index-${index} p`).style.textDecoration = "line-through";
        document.querySelector(`#index-${index} p`).style.color = "rgba(0, 0, 0, 0.2)";
        localStorage.setItem("TaskStorage", JSON.stringify(Task));
    }
    else {
        document.querySelector(`#index-${index} p`).style.textDecoration = "none";
        document.querySelector(`#index-${index} p`).style.color = "black";
        localStorage.setItem("TaskStorage", JSON.stringify(Task));
    }
}

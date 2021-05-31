"use strict";
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
        "id": 5,
        "isCheck": true,
        "content": "papiesz wapiesz"
    }
];
let textInput = document.querySelector('#text-input');
let submitButton = document.querySelector('#submit-button');
let clearListButton = document.querySelector('#clear-list-button');
let listOfTodos = document.querySelector('#list-of-todos');
let taskIndex = Task[(Object.keys(Task).length) - 1].id;
loadTheTasks();
submitButton.addEventListener('click', addTodo);
clearListButton.addEventListener('click', clearList);
function loadTheTasks() {
    for (let i = 0; i < Object.keys(Task).length; i++) {
        if (Task[i]["isCheck"]) {
            listOfTodos.innerHTML += `
				<div id="index-${Task[i].id}" class="task-box">
					<input type="checkbox" id="checkbox-${i}" checked>
					<p> ${Task[i].content} </p>
					<div class="remove-task-button no-select" onclick="removeTask(${i})">🗑️ remove task</div>
				</div>`;
        }
        else {
            listOfTodos.innerHTML += `	
			<div id="index-${Task[i].id}" class="task-box">
				<input type="checkbox" id="checkbox-${i}">
				<p> ${Task[i].content} </p>
				<div class="remove-task-button no-select" onclick="removeTask(${i})">🗑️ remove task</div>
			</div>`;
        }
    }
}
function addTodo() {
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
    }
}
function clearList() {
    listOfTodos.innerHTML = ' ';
}
function removeTask(index) {
    console.log('index-' + index);
    document.getElementById('index-' + index).remove();
}

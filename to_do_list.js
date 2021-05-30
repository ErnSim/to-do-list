// Inital tasks (localStorage in the future)
var Task = {
    0: {
        "isCheck": true,
        "content": "Coś tam bredzę sobie"
    },
    1: {
        "isCheck": false,
        "content": "Abba ojcze"
    },
    5: {
        "isCheck": true,
        "content": "papiesz wapiesz"
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////
// Declare variables
var textInput = document.querySelector('#text-input');
var submitButton = document.querySelector('#submit-button');
var clearListButton = document.querySelector('#clear-list-button');
var listOfTodos = document.querySelector('#list-of-todos');
var taskIndex = Object.keys(Task).length; // znaleść inny sposób na znalezienie ostatniego indexu
// Execute functions
loadTheTasks();
submitButton.addEventListener('click', addTodo);
clearListButton.addEventListener('click', clearList);
//////////////////////////////////////////////////////////////////////////////////////////////////
function loadTheTasks() {
    for (var i = 0; i < 2 /*Object.keys(task).length*/; i++) { // inny sposób na ostatni index
        // typeof myVar !== 'undefined'
        if (Task[i]["isCheck"]) {
            listOfTodos.innerHTML += "\t<div id=\"index-" + i + "\" class=\"task-box\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"checkbox-" + i + "\" checked>\n\t\t\t\t\t\t\t\t\t\t\t<p> " + Task[i]["content"] + " </p>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"remove-task-button no-select\" onclick=\"removeTask(" + i + ")\">remove task</div>\n\t\t\t\t\t\t\t\t\t\t</div>";
        }
        else {
            listOfTodos.innerHTML += "\t<div id=\"index-" + i + "\" class=\"task-box\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"checkbox-" + i + "\">\n\t\t\t\t\t\t\t\t\t\t\t<p> " + Task[i]["content"] + " </p>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"remove-task-button no-select\" onclick=\"removeTask(" + i + ")\">remove task</div>\n\t\t\t\t\t\t\t\t\t\t</div>";
        }
    }
}
function addTodo() {
    var content = textInput.value;
    if (content != "") {
        listOfTodos.innerHTML += "\t<div id=\"index-" + taskIndex + "\" class=\"task-box\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"checkbox-" + taskIndex + "\">\n\t\t\t\t\t\t\t\t\t\t<p> " + content + " </p>\n\t\t\t\t\t\t\t\t\t\t<div class=\"remove-task-button no-select\" onclick=\"removeTask(" + taskIndex + ")\">remove task</div>\n\t\t\t\t\t\t\t\t\t</div>";
        taskIndex++;
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

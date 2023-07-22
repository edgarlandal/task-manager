let isImportant = false;
let isVisible = true;

function saveTask() {
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#color").val();
    const date = $("#selStartDate").val();
    const status = $("#selStatus").val();
    const budget = $("#txtBudget").val();

    let newTask = new Task(isImportant, title, desc, color, date, status, budget);
    console.log(newTask);
    displayTask(newTask);
}

function displayTask(task) {
    let syntax = `
    <div class="task-container">
        <div>
            <h3>Title: ${task.title}</h3>
            <p>Description: ${task.desc}</p>
        </div>
        <div>
            <label> Status: ${task.status}</label>
        </div>
        <div>
            <label>Date Start: ${task.startDate}</label>
            <label>Budger: ${task.budget}</label>
        </div>
    </div>
    `;
    $(".pending-tasks").append(syntax);
}


function toggleImportant() {
    console.log("working!");

    const nonImportantIcon = "fa-regular fa-bookmark";
    const importantIcon = "fa-solid fa-bookmark important-icon ";

    if (isImportant) {
        $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon);
        isImportant = false;
    } else {
        $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
        isImportant = true;
    }

}

function init() {
    console.log("task manager");

    $("#btnSave").click(saveTask);
    $("#iImportant").click(toggleImportant);

}

window.onload = init;
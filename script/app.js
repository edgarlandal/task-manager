let isImportant = false;
let isVisible = true;

let tasks = [];

const NEW = 'new';
const IN_PROGRESS = "in progress";
const COMPLETED = "completed";
const CANCELLED = "cancelled"
const PENDING = "pending";

function saveTask() {
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#color").val();
    const date = $("#selStartDate").val();
    const status = $("#selStatus").val();
    const budget = $("#txtBudget").val();

    let newTask = new Task(isImportant, title, desc, color, date, status, budget);
    console.log(newTask);


    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(newTask),
        contentType: "application/json",
        success: (res) => {
            console.log(res);
        },
        error: (e) => {
            console.log(e);
        },
    });
    clearForm();
    // displayTask(newTask);
}

function displayTask(task) {
    var url = '';
    switch (task.status.toLowerCase()) {
        case NEW:
            url = ('https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg');
            break;

        case IN_PROGRESS:
            url = ('https://t3.ftcdn.net/jpg/05/24/43/88/360_F_524438877_PZFzwc5OWJ3MTWQVFfHKwu1DRVMaSgPx.jpg');
            break;

        case COMPLETED:
            url = ('https://a-static.besthdwallpaper.com/synthwave-retrowave-grid-wallpaper-3440x1440-81405_15.jpg');
            break;

        case CANCELLED:
            url = ('https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg');
            break;

        case PENDING:
            url = ('https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg');
            break;
        default:
            break;
    }

    let syntax = `
    <div class="task-container" style='border-color: ${task.color};  background-image: url(${url});'>
        <div class="info">
            <h5>Title: ${task.title}</h5>
            <p>Description: ${task.description}</p>
        </div>
            <label class="status"> Status: ${task.status}</label>
        <div class="date-budget">
            <label>Date Start: ${task.startDate}</label>
            <label>Budger: ${task.budget}</label>
        </div>
    </div>
    `;
    $(".pending-tasks").append(syntax);
}


function clearForm() {
    $("#txtTitle").val('');
    $("#txtDescription").val('');
    $("#color").val('#000000');
    $("#selStartDate").val('');
    $("#selStatus").val('');
    $("#txtBudget").val('');
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

function toggleVisibility() {
    if (isVisible) {
        $('#form').fadeOut();
        isVisible = false;
    } else {
        $('#form').fadeIn();
        isVisible = true;
    }
}

function loadTask() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        success: (res) => {
            tasks = JSON.parse(res);

            displayTasks();

        },
        error: (e) => {
            console.log(e);
        },

    });

}

function displayTasks() {

    console.log(tasks);

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.title == "Market")
            displayTask(task);
    }
}

function init() {
    console.log("task manager");

    $('#btnDetails').click(toggleVisibility);
    $("#btnSave").click(saveTask);
    $("#iImportant").click(toggleImportant);
    $('#btnDelete').click( () => {
        $(".pending-tasks").html('');
    })

    loadTask();
}

window.onload = init;
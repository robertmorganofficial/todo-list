const subHeading = document.getElementById("sub-heading");
const textBox = document.getElementById("text-box");
const dueDate = document.getElementById("due-date");
const cancelButton = document.getElementById("cancelButton");
const addTaskButton = document.getElementById("addTaskButton");
const todoList = document.getElementById("todo-list");
const taskArray = [];

const saved = localStorage.getItem('tasks');
if (saved) {
    const parsed = JSON.parse(saved);
    taskArray.push(...parsed);
    displayTask();
}



function displayTask() {
    todoList.innerHTML = "";
    taskArray.forEach(task => {
        const li = document.createElement("li");
        //Task name - Top Line
        const taskName = document.createElement("span");
        taskName.textContent = task.task

        // Due date — second line, styled gray + smaller
        const dateSpan = document.createElement("span");
        if (task.duedate) {
            const parts = task.duedate.split('-');
            if (parts.length === 3) {
                dateSpan.textContent = `${parts[1]}/${parts[2]}/${parts[0]}`;
            } else {
                dateSpan.textContent = task.duedate;
            }
        } else {
            dateSpan.textContent = "";
        }

        // Wrapper to stack them vertically
        const textWrapper = document.createElement("div");
        textWrapper.appendChild(taskName);
        textWrapper.appendChild(dateSpan);

        li.appendChild(textWrapper);
        todoList.appendChild(li);


    });

    const taskCount = taskArray.length;
    if (taskCount === 1) {
        subHeading.innerHTML = `${taskCount} task remaining`;
    }
    else {
        subHeading.innerHTML = `${taskCount} tasks remaining`;
    }
}


addTaskButton.addEventListener("click", function (a) {
    a.preventDefault();

    const textValue = textBox.value;
    const dateValue = dueDate.value;

    const fullTask = {
        task: textValue,
        duedate: dateValue
    }

    taskArray.push(fullTask);
    displayTask()
    textBox.value = "";
    dueDate.value = "";
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    const taskData = JSON.parse(localStorage.getItem('tasks'));
    console.log(taskData);
})

cancelButton.addEventListener("click", function (b) {
    b.preventDefault();
    console.log("The button works!");
})
const subHeading = document.getElementById("sub-heading");
const textBox = document.getElementById("text-box");
const dueDate = document.getElementById("due-date");
const cancelButton = document.getElementById("cancelButton");
const addTaskButton = document.getElementById("addTaskButton");
const todoList = document.getElementById("todo-list");
const deleteButton = document.getElementById("delete-btn");
const taskArray = [];

const saved = localStorage.getItem('tasks');
if (saved) {
    const parsed = JSON.parse(saved);
    taskArray.push(...parsed);
    displayTask();
}



function displayTask() {
    todoList.innerHTML = "";
    const template = document.getElementById("task-template");
    
    taskArray.forEach((task, index) => {
        // Clone the template
        const clone = template.content.cloneNode(true);
        
        // Get the elements from the cloned template
        const checkbox = clone.querySelector(".task-checkbox");
        const taskName = clone.querySelector(".task-name");
        const dateSpan = clone.querySelector(".task-date");
        const deleteThis = clone.querySelector(".delete-btn");
        
        // Set the task name
        taskName.textContent = task.task;
        deleteThis.dataset.index = index;
        
        // Format and set the due date
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
        
        // Append the cloned template to the list
        todoList.appendChild(clone);
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

todoList.addEventListener("click", function (b) {
    b.preventDefault();
    const deleteBtn = b.target.closest(".delete-btn");
    if (deleteBtn){
        const index = deleteBtn.dataset.index;
        taskArray.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(taskArray));
        displayTask()
        console.log(index);
        console.log(taskArray);
    }
})

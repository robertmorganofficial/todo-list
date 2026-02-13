/*
Whent he button is pressed, we need to:
-capture the current task
-store that task in an array
-Gather the contents from that array and display them in an unordered list
-We need to create a task object to capture all the details needs such as task name and duedate
*/


const subHeading = document.getElementById("sub-heading");
const textBox = document.getElementById("text-box");
const dueDate = document.getElementById("due-date");
const cancelButton = document.getElementById("cancelButton");
const addTaskButton = document.getElementById("addTaskButton");
const todoList = document.getElementById("todo-list");
const taskArray = [];

function displayTask() {
    todoList.innerHTML = "";
    taskArray.forEach(task => {
        const li = document.createElement("li");
        //Task name - Top Line
        const taskName = document.createElement("span");
        taskName.textContent = task.task

        // Due date — second line, styled gray + smaller
        const dateSpan = document.createElement("span");
        dateSpan.textContent = task.duedate;

         // Wrapper to stack them vertically
         const textWrapper = document.createElement("div");
         textWrapper.appendChild(taskName);
         textWrapper.appendChild(dateSpan);

         li.appendChild(textWrapper);
         todoList.appendChild(li);
    });

    const taskCount = taskArray.length;
    if (taskCount === 1){
        subHeading.innerHTML = `${taskCount} task remaining`;
    }
    else{
        subHeading.innerHTML = `${taskCount} tasks remaining`;
    }
}


addTaskButton.addEventListener("click", function (a) {
    a.preventDefault();

    const textValue = textBox.value;
    const dateValue = dueDate.value;

    const fullTask ={
        task: textValue,
        duedate: dateValue
    }

    taskArray.push(fullTask);
    displayTask()
    textBox.value = "";
    dueDate.value = "";
})

cancelButton.addEventListener("click", function (b) {
    b.preventDefault();
    console.log("The button works!");
})
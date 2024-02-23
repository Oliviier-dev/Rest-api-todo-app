type Task = {
    id:number,
    title: string,
    completed: boolean
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const todoList = document.querySelector<HTMLUListElement>(".todo-list")!;
const tasks:Task[] = [];

tasks.forEach(addListItem);


form?.addEventListener('submit', e =>{
    e.preventDefault()

    if(input?.value == "" || input?.value == null) return

    const newTask: Task = {
        id: tasks.length + 1,
        title: input.value,
        completed: false,
    }
    tasks.push(newTask);
    
    addListItem(newTask)
    input.value = ""
})


function addListItem(task: Task){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.setAttribute('data-id', task.id.toString());

    const newTodo = document.createElement("li");
    newTodo.innerText = task.title;


    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    completedButton.addEventListener('click', () => {
        toggleCompleted(task.id);
    });
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    editButton.addEventListener('click', () => {
        editTask(task.id);
    });
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    trashButton.addEventListener('click', () => {
        deleteTask(task.id);
    });
    todoDiv.appendChild(trashButton);

    todoList.insertBefore(todoDiv, todoList.children[0]);
}

function toggleCompleted(id: number) {
    const selectedTask = tasks.find(task => task.id === id);
    if (selectedTask) {
        selectedTask.completed = !selectedTask.completed;
        const todoItem = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
        if (selectedTask.completed) {
            todoItem.classList.add('completed');
        } else {
            todoItem.classList.remove('completed');
        }
    }
}

function deleteTask(id: number) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        if (todoItem) {
            todoItem.remove();
        }
    }
}

function editTask(id: number) {
    const selectedTaskIndex = tasks.findIndex(task => task.id === id);
    const selectedTask = tasks.find(task => task.id === id);

    if (selectedTaskIndex !== -1) {
        tasks.splice(selectedTaskIndex, 1);

        const editInput = document.querySelector<HTMLInputElement>("#new-task-title")!;
        editInput.value = selectedTask ? selectedTask.title : "";

        const todoItem = document.querySelector(`[data-id="${id}"]`);
        if (todoItem) {
            todoItem.remove();
        }
    }
}
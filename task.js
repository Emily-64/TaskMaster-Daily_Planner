
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');


// load
window.addEventListener('DOMContentLoaded', ()=>{
const saved = JSON.parse(localStorage.getItem('tasks')) || [];
saved.forEach(task => renderTask(task));
});


addBtn.addEventListener('click', ()=> addTask());
taskInput.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') addTask(); });


function addTask(){
const text = taskInput.value.trim();
if(!text) return;
const task = { id: crypto.randomUUID(), text, done:false };
saveTask(task);
renderTask(task);
taskInput.value = '';
}


function saveTask(task){
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTask(task){
const li = document.createElement('li');
li.dataset.id = task.id;
if(task.done) li.classList.add('done');


const span = document.createElement('span');
span.textContent = task.text;


const actions = document.createElement('div');
actions.className = 'actions';


const completeBtn = document.createElement('button');
completeBtn.className = 'complete';
completeBtn.title = 'Mark complete';
completeBtn.textContent = task.done ? '⟲' : '✔';
completeBtn.onclick = ()=> toggleDone(li.dataset.id);


const deleteBtn = document.createElement('button');
deleteBtn.className = 'delete';
deleteBtn.title = 'Delete task';
deleteBtn.textContent = '✖';
deleteBtn.onclick = ()=> deleteTask(li.dataset.id);


actions.appendChild(completeBtn);
actions.appendChild(deleteBtn);


li.appendChild(span);
li.appendChild(actions);
taskList.appendChild(li);
}


function toggleDone(id){
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const idx = tasks.findIndex(t => t.id === id);
if(idx === -1) return;
tasks[idx].done = !tasks[idx].done;
localStorage.setItem('tasks', JSON.stringify(tasks));
refreshList();
}


function deleteTask(id){
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks = tasks.filter(t => t.id !== id);
localStorage.setItem('tasks', JSON.stringify(tasks));
refreshList();
}


function refreshList(){
taskList.innerHTML = '';
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(renderTask);
}

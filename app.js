//get var input from input

const task = document.querySelector('#task');
const form = document.querySelector('#task-form');
const ul = document.querySelector('.collection');
const clear = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//load all event listeners

loadAllEventListeners();

//functions


function loadAllEventListeners () {
  form.addEventListener('submit',addTask);
  ul.addEventListener('click',deleteTask);
  clear.addEventListener('click',clearTasks);
  document.addEventListener('DOMContentLoaded',setTasks);
  filter.addEventListener('keyup',filterTasks);

}
function filterTasks () {
    let listItems = document.querySelectorAll('.collection-item');
    
    listItems.forEach(li=>{
      if(li.textContent.toUpperCase().indexOf(filter.value.toUpperCase()) > -1){
        li.style.display = '';
      }else {
        li.style.display='none';
      }
    });
    
}

function addTask (e) {
  e.preventDefault();
  if (task.value === '')
  alert("Please enter a task");
  else {

  //create elements

  const li = document.createElement('li');
  const text = document.createTextNode(task.value);
  const link = document.createElement('a');

  //add classes

  link.className = 'delete-item secondary-content';
  li.className = 'collection-item';
  link.innerHTML = "<i class='fa fa-remove'></i>";

  //append child
  li.appendChild(link);
  li.appendChild(text);
  ul.appendChild(li);
  
  addtoLocalStorage(task.value);
  //clear input

  task.value = '';
  }

}

function setTasks (taskItem) {
  //get tasks from localstorage and add to the page
let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task)=> {
    const li = document.createElement('li');
    const text = document.createTextNode(task);
    const link = document.createElement('a');

    //add classes

    link.className = 'delete-item secondary-content';
    li.className = 'collection-item';
    link.innerHTML = "<i class='fa fa-remove'></i>";

    //append child
    li.appendChild(link);
    li.appendChild(text);
    ul.appendChild(li);
    })


}

function addtoLocalStorage (task) {
    let tasks;
    if(localStorage.getItem('tasks')===null){
      tasks = [];

    }else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function deleteTask (e) {
  
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm("Are you sure?"))
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}
function removeFromLocalStorage (taskItem) {
  let tasks;
  if (localStorage.getItem('tasks')===null) {
    tasks = [];
  }else {
    tasks =JSON.parse(localStorage.getItem('tasks'));
  }
   tasks.forEach((task,index)=>{
     if (taskItem.textContent === task){
       tasks.splice(index,1);
     }
     localStorage.setItem('tasks',JSON.stringify(tasks));
   })
}
function clearTasks () {
  ul.innerHTML = '';
  
}

// storage.js
let tasks = [];

// === Activity 2: localStorage helper functions ===
function setLocalStorage(key, data) {
  // Convert JS object or array into a string
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
}

function getLocalStorage(key) {
  // Read string, turn back into JS data
  const json = localStorage.getItem(key);
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}


//new//
function setUser() {
  // 1) read from localStorage
  const saved = localStorage.getItem("todo-user"); // returns a string or null
  // 2) if we have a saved name, show it in the header
  if (saved) {
    document.querySelector(".user").textContent = saved;
  } else {
    document.querySelector(".user").textContent = "[user name here]";
  }
}

function saveUser() {
  // 1) get the name from the input
  const name = document.querySelector("#username").value.trim();
  if (!name) return; // nothing to save
  // 2) save to localStorage under the key "todo-user"
  localStorage.setItem("todo-user", name);
  // 3) show it in the header
  document.querySelector(".user").textContent = name;
  // optional: clear the input
  document.querySelector("#username").value = "";
}

//end of new codes//

//activity 2//

function setLocalStorage(key, data) {           // do not change function name
  const json = JSON.stringify(data);            // convert JS value -> string
  localStorage.setItem(key, json);
}

function getLocalStorage(key) {                 // do not change function name
  const json = localStorage.getItem(key);       // string or null
  if (!json) return null;
  try {
    return JSON.parse(json);                    // convert string -> JS value
  } catch {
    return null;
  }
}



function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>`
}

function renderTasks(tasks) {
  // get the list element from the DOM
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = "";
  // loop through the tasks array. transform (map) each task object into the appropriate HTML to represent a to-do.
  const html = tasks.map(taskTemplate).join("");
  listElement.innerHTML = html;
}

function newTask() {
  // get the value entered into the #todo input
  const task = document.querySelector("#todo").value.trim();
  if (!task) return; // ✅ optional but recommended

  // add it to our arrays tasks
  tasks.push({ detail: task, completed: false });

    // 4️⃣ Save the updated list to localStorage
  setLocalStorage("todos", tasks); // new line//

  // render out the list//
  renderTasks(tasks);

    // 6️⃣ Clear the input box (optional, but looks cleaner)
  document.querySelector("#todo").value = "";
}

function removeTask(taskElement) {
  // Notice how we are using taskElement instead of document as our starting point?
  // This will restrict our search to the element instead of searching the whole document.
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector('p').innerText
  );
  setLocalStorage("todos", tasks);  
  taskElement.remove();
}

function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  tasks[taskIndex].completed = tasks[taskIndex].completed;
  setLocalStorage("todos", tasks); // <-- this is the new line
  taskElement.classList.toggle("strike");
}

function manageTasks(e) {
  // did they click the delete or complete icon?
  console.log(e.target);
  const parent = e.target.closest("li");
  if (e.target.dataset.action === "delete") {
    removeTask(parent);
  }
  if (e.target.dataset.action === "complete") {
    completeTask(parent);
  }
}

// Add your event listeners here
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);
document.querySelector("#saveUser").addEventListener("click", saveUser);

// Run once when the page loads so we display a saved name if present
setUser();

// render  the initial list of tasks (if any) when the page loads
renderTasks(tasks);
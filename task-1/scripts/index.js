// Load tasks from localStorage and display them
var tasks = localStorage.getItem('tasks');
if (tasks) {
  tasks = JSON.parse(tasks);
  tasks.forEach(task => {
    var li = document.createElement("li");
    var t = document.createTextNode(task.text);
    li.appendChild(t);

    // Add the checked class if the task is marked as checked
    if (task.checked) {
      li.classList.add('checked');
    }

    // Add a data-id attribute to each task for identification
    li.setAttribute('data-id', task.id);

    document.getElementById("myUL").appendChild(li);

    // Create and append close button to each task
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  });
}

// Function to add close buttons to the existing list items
function addCloseButtons() {
  var myNodelist = document.getElementsByTagName("LI");
  for (let i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
}

// Close button event delegation (works for dynamically added items)
document.getElementById("myUL").addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    var li = event.target.parentElement;
    li.style.display = "none";

    // Remove the task from localStorage using the data-id attribute
    var taskId = li.getAttribute('data-id');
    var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

// Toggle 'checked' class when clicking on list items
document.getElementById("myUL").addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
    // Update the 'checked' status in localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    var taskId = event.target.getAttribute('data-id');
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.checked = event.target.classList.contains('checked');
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

// Add a new task when clicking the Add button or pressing Enter
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    var li = document.createElement("li");
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);

    // Create and append close button to new list item
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // Create a unique ID for the task
    var taskId = new Date().toISOString();

    // Save tasks to localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({ id: taskId, text: inputValue, checked: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add the unique ID to the list item
    li.setAttribute('data-id', taskId);
  }

  // Clear the input field
  document.getElementById("myInput").value = "";
}

// Event listener for Add button
document.getElementById("addBtn").addEventListener('click', newElement);

// Allow adding a task with Enter key press
document.getElementById("myInput").addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    newElement();
  }
});

// Initialize close buttons on page load
addCloseButtons();

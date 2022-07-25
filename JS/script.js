let deleteBtn = document.querySelector(".del"),
    myInput = document.querySelector(".my-input"),
    addBtn = document.querySelector(".add"),
    mainDiv = document.querySelector(".maindiv"),
    myContainer = document.querySelector(".container"),
    myCheck = document.querySelector(".maindiv .check");

let myArray = [];

// Check if there are any tasks in the localStorage in the beggining.  
if (localStorage.getItem('tasks')) {
    myArray = JSON.parse(localStorage.getItem('tasks'));
    getFromlocalStorage();
}

// Add tasks when press (Enter) in keyboard 
myInput.addEventListener("keyup", (event) => {
    if (event.code ==="Enter") {
        taskToArray(myInput.value);
        myInput.value = "";
    }
})
// Add tasks when click (Add) btn 
addBtn.addEventListener("click", function () {
    if (myInput.value !== "") {
        taskToArray(myInput.value);
        myInput.value = "";
    }
})

function taskToArray(val) {
    const task = {
        id: Date.now(),
        title: val,
    }
    // Push tasks to myArray
    myArray.push(task);

    // CreateDiv Func.
    createDiv(task);

    // Add Task To Local Storage Func.
    addTolocalStorage(myArray);
}


function createDiv(task) {
    // Add the newDiv to page
    let newDiv = mainDiv.cloneNode(true);
    newDiv.children[1].innerHTML = task.title;
    newDiv.setAttribute("data-id", task.id);
    newDiv.style.cssText = "display: flex !important;";
    myContainer.appendChild(newDiv);

    // Handling (checkbox)
    newDiv.children[0].onclick = function () {
        myCheck.checked ? myCheck.checked = false : myCheck.checked = true;
        // Check the checkbox (Done condition)
        if (myCheck.checked) {
            newDiv.children[1].style.cssText = "text-decoration: line-through solid #00aeef 20%";
            newDiv.classList.add("text-white");
            newDiv.classList.remove("bg-transparent");
            newDiv.classList.add("bg-secondary");
        }
        else {
            newDiv.children[1].style.cssText = "text-decoration: none";
            newDiv.classList.remove("text-white");
            newDiv.classList.add("bg-transparent");
            newDiv.classList.remove("bg-secondary");
        }
    }

    // Handle (Delete Btn)
    newDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("del")) {
            // Delete the div from the localStorage
            delLocalStorage(e.target.parentElement.parentElement.getAttribute("data-id"));
            // Delete the div from the whole page
            e.target.parentElement.parentElement.remove();
        }
    })
}

function addTolocalStorage(array) {
    window.localStorage.setItem('tasks', JSON.stringify(array));
}


function getFromlocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let task = JSON.parse(data);
        task.forEach(e => {
            createDiv(e);
        })
    }
}


function delLocalStorage(id){
    myArray = myArray.filter(task => task.id != id)
    addTolocalStorage(myArray);
}
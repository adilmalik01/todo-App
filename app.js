let todoArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
console.log(todoArray);

let submitBtn = document.querySelector("#addTask")
let mainDiv = document.querySelector('.todo-result-div')

window.onload = () => {
    createCard()

}



submitBtn.addEventListener("click", (event) => {
    let taskText = document.querySelector("#takeTakeValue").value
    event.preventDefault();
    if (!taskText) {
        Swal.fire({
            text: "please Write Something",
            icon: "info",
            showConfirmButton: false,
            timer: 1000
        });
        return;
    }
    saveLocal(taskText)
    taskText.value = ""
})



// save in localStorage
const saveLocal = (inputValue) => {
    todoArray.unshift(inputValue)
    localStorage.setItem("todos", JSON.stringify(todoArray))

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Task Created"
    });
    setInterval(() => {
        location.reload();
    }, 1000)
}


// create Todo div
const createCard = () => {

    todoArray.forEach((item, index) => {

        let task = document.createElement("div")
        task.className = 'task'

        let text = document.createElement("div")
        text.className = 'text'

        let text_para = document.createElement("p")
        text_para.innerHTML = item

        let other = document.createElement("div")
        other.className = 'other-btn'

        let editBtn = document.createElement("button")
        let editIcon = document.createElement("i")
        editIcon.className = 'bi bi-pencil-fill'
        editBtn.setAttribute("onclick", `editTodo(${index})`)
        editBtn.appendChild(editIcon)


        let delBtn = document.createElement("button")
        let delIcon = document.createElement("i")
        delIcon.className = 'bi bi-trash-fill'
        delBtn.setAttribute("onclick", `delTodo(${index})`)
        delBtn.appendChild(delIcon)


        other.appendChild(editBtn)
        other.appendChild(delBtn)

        mainDiv.appendChild(task)
        task.appendChild(text)
        text.appendChild(text_para)
        task.appendChild(other)
    });

}



let hiddenInp = document.querySelector('#hiddenInp')
let savbtn = document.querySelector('.saveTask')
let taskText = document.querySelector("#takeTakeValue")

// edit todo
const editTodo = async (index) => {

    let editTask = localStorage.getItem("todos")
    let todoArray = JSON.parse(editTask)

    const { value: text } = await Swal.fire({
        title: "Edit",
        html: `
        <input type="text" id="editTitle" class="swal2-input" placeholder="Post Title" value="${todoArray[index]}" required>
         `,
        inputAttributes: {
            "aria-label": "Type your message here"
        },
        showCancelButton: true
    });
    if (text) {
        let newValue = document.querySelector("#editTitle")
        todoArray[index] = newValue.value
        localStorage.setItem("todos", JSON.stringify(todoArray))

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Update Todo"
        });
        setInterval(() => {
            location.reload();
        }, 2000)
    }

}




// delete Todo 

const delTodo = (index) => {
    let delTask = localStorage.getItem("todos")
    let todoArray = JSON.parse(delTask)
    tododel = todoArray.splice(index, 1)
    tododel.shift()
    localStorage.setItem("todos", JSON.stringify(todoArray))

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Deleted",
    });
    setInterval(() => {
        location.reload();
    }, 1000)

}

// delete All todo
let allTodo = document.querySelector(".delAllTodo")
allTodo.addEventListener("click", (e) => {
    Swal.fire({
        title: "Delete All",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            delAll = todoArray.splice(0)
            delAll.shift()
            localStorage.setItem("todos", JSON.stringify(todoArray))

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Delete All",
                text: "Your Tasks Deleted"
            });
            setInterval(() => {
                location.reload();
            }, 1000)

        }
    });
})
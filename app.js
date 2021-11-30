const formulario = document.getElementById('form');
const todoList = document.querySelector(".tolist");
const template = document.getElementById("my-template").content
const fragment = new DocumentFragment();
let tareas = {}

document.addEventListener("DOMContentLoaded", () => {
    pintarTareas();
})

todoList.addEventListener('click', e => {
    btnAction(e)
})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    setTarea(e)
})

const setTarea = e => {
    if (e.target[0].value.trim() === '') {
        return
    }
    const tarea = {
        id: Date.now(),
        text: e.target[0].value,
        estado: false
    }

    tareas[tarea.id] = tarea
    formulario.reset()
    e.target[0].focus()
    pintarTareas()
}

const pintarTareas = () => {
    todoList.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.text

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })

    todoList.appendChild(fragment)
}

const btnAction = e => {
    if (e.target.classList.contains('fa-check-circle')) {
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }
    if (e.target.classList.contains('fa-minus-circle')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }

    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()
}





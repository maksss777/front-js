// CRUD - Create, Read, Update, Delete

const form = document.getElementById('form')
const input = document.getElementById('input')
const list = document.getElementById('list')

let tasks = []

// addEventListener
form.addEventListener('submit', event => {
    event.preventDefault()
    const title = input.value.trim()

    if(!title) return;

    tasks.push({id: Date.now(), title: title, done: false})
    render();
    input.value = ''
    console.log(tasks);
    
    
})


list.addEventListener('click', event  => {
    const li = event.target.closest('li')
    if (!li) return;

    const id = Number(li.dataset.id)

    if(event.target.classList.contains('toggle')){
        const task = tasks.find(task => task.id === id)
        task.done = !task.done
        render()
    }

    if(event.target.classList.contains('delete')){
        tasks = tasks.filter(task => task.id !== id)
        render()
    }

    
})

list.addEventListener('dblclick', event => {
    const span = event.target.closest('span')
    if (!span) return;

    const li = span.closest('li')
    const id = Number(li.dataset.id)
    const task = tasks.find(task => task.id === id)

    const editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.value = task.title

    li.replaceChild(editInput, span)
    editInput.focus()

    editInput.addEventListener('blur', () => {
        const title = editInput.value.trim()
        if (title) task.title = title
        render()
    }, {once: true})

    editInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') editInput.blur()
        if (event.key === 'Escape') {
            editInput.value = task.title
            editInput.blur()
        }
    })
})

function render(){
    list.innerHTML = ''

    tasks.map(task => {
        const li = document.createElement('li')
        li.dataset.id = task.id

        const span = document.createElement('span')
        span.textContent = task.title

        if(task.done) li.classList.add('done')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = task.done
        checkbox.className = 'toggle'

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = '✕'
        deleteBtn.className = 'delete'

        li.append(checkbox, span, deleteBtn)
        list.append(li)
        
        console.log(task);

        
        
    })
}

render()
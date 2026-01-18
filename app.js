const input = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todos-section');
const container = document.querySelector("container");


let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const div = document.createElement('div');
    div.className = 'todo-item';

    const span = document.createElement('span');
    span.contentEditable = false;
    span.textContent = todo.text;
    div.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      if (editBtn.textContent === 'Edit') {
        span.contentEditable = true;
        span.focus();
        editBtn.textContent = 'Save';
      } else {
        span.contentEditable = false;
        todos[idx].text = span.textContent.trim();
        localStorage.setItem('todos', JSON.stringify(todos));
        editBtn.textContent = 'Edit';
      }
    };
    const delBtn = document.createElement('button');
    delBtn.className = 'delete';
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      todos.splice(idx, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    div.appendChild(actions);
    todoList.appendChild(div);
  });
}
addBtn.onclick = () => {
  const val = input.value.trim();
  if (!val) return alert('Please enter a task!');
  todos.push({ text: val });
  input.value = '';
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
};
renderTodos();

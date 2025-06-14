// 할 일 목록을 저장할 배열
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// DOM 요소
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// 페이지 로드 시 저장된 할 일 목록 표시
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

// 할 일 추가 함수
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
}

// 할 일 삭제 함수
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// 할 일 완료 상태 토글 함수
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

// 할 일 목록 렌더링 함수
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span>${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
        `;
        
        todoList.appendChild(li);
    });
}

// 로컬 스토리지에 할 일 목록 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Enter 키로 할 일 추가
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

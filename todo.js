// Todo 클래스 정의
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.addButton = document.getElementById('addButton');
        this.todoCount = document.getElementById('todoCount');

        this.init();
    }

    init() {
        // 이벤트 리스너 등록
        this.addButton.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // 초기 할 일 목록 렌더링
        this.renderTodos();
    }

    addTodo() {
        const todoText = this.todoInput.value.trim();
        if (todoText === '') return;

        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false,
            createdAt: new Date()
        };

        this.todos.push(todo);
        this.saveTodos();
        this.renderTodos();
        this.todoInput.value = '';

        // 입력 필드에 포커스
        this.todoInput.focus();
    }

    deleteTodo(id) {
        // Bootstrap 모달 대신 간단한 확인
        if (confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.renderTodos();
        }
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.saveTodos();
        this.renderTodos();
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('ko-KR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        this.todoCount.textContent = `${this.todos.length}개의 할 일`;

        if (this.todos.length === 0) {
            this.todoList.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-clipboard-list text-4xl mb-3"></i>
                    <p>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
                </div>
            `;
            return;
        }

        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `group flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
                todo.completed ? 'opacity-75' : ''
            }`;
            
            li.innerHTML = `
                <div class="flex items-center gap-3 flex-1">
                    <input type="checkbox" 
                           ${todo.completed ? 'checked' : ''} 
                           class="w-5 h-5 rounded-full border-gray-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer transition-all duration-200">
                    <div class="flex-1">
                        <span class="${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}">${todo.text}</span>
                        <p class="text-xs text-gray-400 mt-1">${this.formatDate(todo.createdAt)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button class="delete-btn px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <i class="fas fa-trash-alt mr-2"></i>삭제
                    </button>
                </div>
            `;

            // 체크박스 이벤트 리스너
            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

            // 삭제 버튼 이벤트 리스너
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
            
            this.todoList.appendChild(li);
        });
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

// DOM이 로드되면 Todo 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
}); 
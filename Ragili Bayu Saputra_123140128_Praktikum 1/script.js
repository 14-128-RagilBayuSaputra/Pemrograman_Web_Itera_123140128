let tasks = [];
let editingTaskId = null;

// Mengambil elemen DOM
const taskForm = document.getElementById('taskForm');
const cancelBtn = document.getElementById('cancelBtn');
const taskList = document.getElementById('taskList');
const filterStatus = document.getElementById('filterStatus');
const searchCourse = document.getElementById('searchCourse');

// Error spans
const nameError = document.getElementById('nameError');
const courseError = document.getElementById('courseError');
const deadlineError = document.getElementById('deadlineError');

// Stats elements
const totalTasksEl = document.getElementById('totalTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const completedTasksEl = document.getElementById('completedTasks');

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
    updateStats();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function validateForm() {
    let isValid = true;
    
    // Sembunyikan semua error
    document.querySelectorAll('.error').forEach(el => el.style.display = 'none');

    const name = document.getElementById('taskName').value.trim();
    const course = document.getElementById('taskCourse').value.trim();
    const deadline = document.getElementById('taskDeadline').value;

    if (!name) {
        nameError.style.display = 'block';
        isValid = false;
    }

    if (!course) {
        courseError.style.display = 'block';
        isValid = false;
    }

    if (!deadline) {
        deadlineError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const taskData = {
        id: editingTaskId || Date.now(),
        name: document.getElementById('taskName').value.trim(),
        course: document.getElementById('taskCourse').value.trim(),
        deadline: document.getElementById('taskDeadline').value,
        description: document.getElementById('taskDescription').value.trim(),
        completed: false, // Default status
        createdAt: new Date().toISOString()
    };

    if (editingTaskId) {
        // Mode Edit
        const index = tasks.findIndex(t => t.id === editingTaskId);
        if (index !== -1) {
            taskData.completed = tasks[index].completed; // Pertahankan status 'completed'
            tasks[index] = taskData;
        }
        editingTaskId = null;
        document.getElementById('formTitle').textContent = '➕ Tambah Tugas Baru';
        cancelBtn.style.display = 'none';
    } else {
        // Mode Tambah Baru
        tasks.unshift(taskData); // Tambahkan ke awal array
    }

    saveTasks();
    renderTasks();
    updateStats();
    this.reset();
    
    alert('Tugas berhasil disimpan!');
});

cancelBtn.addEventListener('click', function() {
    editingTaskId = null;
    taskForm.reset();
    document.getElementById('formTitle').textContent = '➕ Tambah Tugas Baru';
    this.style.display = 'none';
    document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
});

function renderTasks() {
    const filterValue = filterStatus.value;
    const searchValue = searchCourse.value.toLowerCase();

    let filteredTasks = tasks.filter(task => {
        const statusMatch = filterValue === 'all' || 
            (filterValue === 'pending' && !task.completed) ||
            (filterValue === 'completed' && task.completed);
        const courseMatch = task.course.toLowerCase().includes(searchValue);
        return statusMatch && courseMatch;
    });

    if (filteredTasks.length === 0) {
        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <div class="icon">📝</div>
                    <p>Belum ada tugas. Tambahkan tugas pertama Anda!</p>
                </div>
            `;
        } else {
            taskList.innerHTML = `
                <div class="empty-state">
                    <div class="icon">🔍</div>
                    <p>Tidak ada tugas yang sesuai dengan filter/pencarian.</p>
                </div>
            `;
        }
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => {
        const deadlineDate = new Date(task.deadline);
        const formattedDeadline = deadlineDate.toLocaleString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-title">${task.name}</div>
                    <span class="task-badge ${task.completed ? 'badge-completed' : 'badge-pending'}">
                        ${task.completed ? '✓ Selesai' : '⏳ Pending'}
                    </span>
                </div>
                <div class="task-info">
                    <strong>📖 Mata Kuliah:</strong> ${task.course}<br>
                    <strong>📅 Deadline:</strong> ${formattedDeadline}
                    ${task.description ? `<br><strong>📝 Deskripsi:</strong> ${task.description}` : ''}
                </div>
                <div class="task-actions">
                    <button class="btn btn-success" data-action="toggle">
                        ${task.completed ? '↺ Batal' : '✓ Selesai'}
                    </button>
                    <button class="btn btn-warning" data-action="edit">✏️ Edit</button>
                    <button class="btn btn-danger" data-action="delete">🗑️ Hapus</button>
                </div>
            </div>
        `;
    }).join('');
}

// Event delegation untuk tombol-tombol aksi
taskList.addEventListener('click', (e) => {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;

    const id = Number(taskItem.dataset.taskId);
    const action = target.dataset.action;

    if (action === 'toggle') {
        toggleComplete(id);
    } else if (action === 'edit') {
        editTask(id);
    } else if (action === 'delete') {
        deleteTask(id);
    }
});

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingTaskId = id;
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskCourse').value = task.course;
        document.getElementById('taskDeadline').value = task.deadline;
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('formTitle').textContent = '✏️ Edit Tugas';
        cancelBtn.style.display = 'block';
        
        // Scroll ke atas form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteTask(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function updateStats() {
    const total = tasks.length;
    const pending = tasks.filter(t => !t.completed).length;
    const completed = total - pending;

    totalTasksEl.textContent = total;
    pendingTasksEl.textContent = pending;
    completedTasksEl.textContent = completed;
}

// Tambahkan event listener untuk filter
filterStatus.addEventListener('change', renderTasks);
searchCourse.addEventListener('input', renderTasks);

// Muat tugas saat halaman pertama kali dibuka
loadTasks();
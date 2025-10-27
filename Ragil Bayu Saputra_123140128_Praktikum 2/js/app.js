/**
 * ========================================
 * DASHBOARD APPLICATION CLASS
 * Class utama untuk mengelola aplikasi
 * ========================================
 */

import Storage from './storage.js';

class DashboardApp {
    constructor() {
        this.storage = new Storage();
        this.data = this.storage.getData();
        this.init();
    }

    /**
     * Inisialisasi aplikasi
     */
    init() {
        this.updateDateTime();
        this.loadWeather();
        this.renderAll();
        
        // Update waktu setiap detik
        setInterval(() => this.updateDateTime(), 1000);
    }

    /* ========================================
       DATETIME & WEATHER FUNCTIONS
       ======================================== */

    /**
     * Arrow function untuk update tanggal dan waktu
     */
    updateDateTime = () => {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const dateTimeStr = now.toLocaleDateString('id-ID', options);
        document.getElementById('datetimeText').textContent = dateTimeStr;
    }

    /**
     * Async function untuk memuat data cuaca
     */
    async loadWeather() {
        try {
            const weatherData = await this.fetchWeatherData();
            const { city, temp, condition, icon } = weatherData;
            
            // Template literals untuk menampilkan cuaca
            document.getElementById('weatherInfo').innerHTML = `
                <span style="font-size: 1.5em;">${icon}</span>
                <div>
                    <div style="font-size: 16px; font-weight: 600;">${city}</div>
                    <div style="font-size: 14px; opacity: 0.9;">${temp}°C • ${condition}</div>
                </div>
            `;
        } catch (error) {
            document.getElementById('weatherInfo').innerHTML = `
                <span>⚠️</span>
                <span>Gagal memuat cuaca</span>
            `;
        }
    }

    /**
     * Promise untuk simulasi fetch cuaca
     */
    fetchWeatherData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const conditions = [
                    { condition: 'Cerah', icon: '☀️' },
                    { condition: 'Berawan', icon: '⛅' },
                    { condition: 'Hujan Ringan', icon: '🌧️' }
                ];
                const random = conditions[Math.floor(Math.random() * conditions.length)];
                
                resolve({
                    city: 'Bandar Lampung',
                    temp: 26 + Math.floor(Math.random() * 6),
                    condition: random.condition,
                    icon: random.icon
                });
            }, 1500);
        });
    }

    /* ========================================
       MODAL FUNCTIONS
       ======================================== */

    /**
     * Arrow function untuk membuka modal
     */
    openModal = (type) => {
        document.getElementById(`${type}Modal`).classList.add('active');
    }

    /**
     * Arrow function untuk menutup modal
     */
    closeModal = (type) => {
        document.getElementById(`${type}Modal`).classList.remove('active');
        this.clearForm(type);
    }

    /**
     * Arrow function untuk membersihkan form
     */
    clearForm = (type) => {
        const forms = {
            schedule: ['scheduleCourse', 'scheduleDay', 'scheduleTime', 'scheduleRoom', 'scheduleLecturer'],
            task: ['taskTitle', 'taskDeadline', 'taskPriority', 'taskDescription'],
            note: ['noteTitle', 'noteContent']
        };
        
        forms[type].forEach(id => {
            const element = document.getElementById(id);
            element.value = '';
        });
    }

    /* ========================================
       SAVE FUNCTIONS
       ======================================== */

    /**
     * Simpan jadwal kuliah
     */
    saveSchedule = () => {
        const schedule = {
            id: Date.now(),
            course: document.getElementById('scheduleCourse').value,
            day: document.getElementById('scheduleDay').value,
            time: document.getElementById('scheduleTime').value,
            room: document.getElementById('scheduleRoom').value,
            lecturer: document.getElementById('scheduleLecturer').value
        };

        if (!schedule.course || !schedule.time) {
            alert('⚠️ Mohon isi semua field yang diperlukan!');
            return;
        }

        this.data.schedules.push(schedule);
        this.storage.saveData(this.data);
        this.renderSchedules();
        this.closeModal('schedule');
    }

    /**
     * Simpan tugas
     */
    saveTask = () => {
        const task = {
            id: Date.now(),
            title: document.getElementById('taskTitle').value,
            deadline: document.getElementById('taskDeadline').value,
            priority: document.getElementById('taskPriority').value,
            description: document.getElementById('taskDescription').value,
            completed: false
        };

        if (!task.title || !task.deadline) {
            alert('⚠️ Mohon isi semua field yang diperlukan!');
            return;
        }

        this.data.tasks.push(task);
        this.storage.saveData(this.data);
        this.renderTasks();
        this.closeModal('task');
    }

    /**
     * Simpan catatan
     */
    saveNote = () => {
        const note = {
            id: Date.now(),
            title: document.getElementById('noteTitle').value,
            content: document.getElementById('noteContent').value,
            createdAt: new Date().toLocaleString('id-ID')
        };

        if (!note.title || !note.content) {
            alert('⚠️ Mohon isi semua field yang diperlukan!');
            return;
        }

        this.data.notes.push(note);
        this.storage.saveData(this.data);
        this.renderNotes();
        this.closeModal('note');
    }

    /* ========================================
       DELETE & TOGGLE FUNCTIONS
       ======================================== */

    /**
     * Delete item dengan destructuring
     */
    deleteItem = (type, id) => {
        if (!confirm('🗑️ Yakin ingin menghapus item ini?')) return;

        const { schedules, tasks, notes } = this.data;
        
        if (type === 'schedule') {
            this.data.schedules = schedules.filter(item => item.id !== id);
        } else if (type === 'task') {
            this.data.tasks = tasks.filter(item => item.id !== id);
        } else if (type === 'note') {
            this.data.notes = notes.filter(item => item.id !== id);
        }

        this.storage.saveData(this.data);
        this.renderAll();
    }

    /**
     * Toggle status tugas
     */
    toggleTask = (id) => {
        const task = this.data.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.storage.saveData(this.data);
            this.renderTasks();
        }
    }

    /* ========================================
       RENDER FUNCTIONS
       ======================================== */

    /**
     * Render semua data
     */
    renderAll = () => {
        this.renderSchedules();
        this.renderTasks();
        this.renderNotes();
    }

    /**
     * Render jadwal dengan template literals
     */
    renderSchedules = () => {
        const container = document.getElementById('scheduleList');
        const { schedules } = this.data;

        if (schedules.length === 0) {
            container.innerHTML = '<div class="empty-state">Belum ada jadwal kuliah</div>';
            return;
        }

        // Menggunakan map (higher-order function) dan template literals
        container.innerHTML = schedules.map(schedule => `
            <div class="item">
                <div class="item-header">
                    <div class="item-title">📖 ${schedule.course}</div>
                    <div class="item-actions">
                        <button class="btn btn-danger" onclick="app.deleteItem('schedule', ${schedule.id})">
                            🗑️ Hapus
                        </button>
                    </div>
                </div>
                <div class="item-content">
                    <div style="margin-bottom: 5px;">📅 <strong>${schedule.day}</strong> | ⏰ ${schedule.time}</div>
                    <div style="margin-bottom: 5px;">📍 Ruang ${schedule.room}</div>
                    <div>👨‍🏫 ${schedule.lecturer}</div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render tugas
     */
    renderTasks = () => {
        const container = document.getElementById('taskList');
        const { tasks } = this.data;

        if (tasks.length === 0) {
            container.innerHTML = '<div class="empty-state">Belum ada tugas</div>';
            document.getElementById('taskStats').textContent = '0';
            return;
        }

        // Hitung tugas yang belum selesai
        const incompleteTasks = tasks.filter(t => !t.completed).length;
        document.getElementById('taskStats').textContent = incompleteTasks;

        // Sort berdasarkan deadline (menggunakan spread operator)
        const sortedTasks = [...tasks].sort((a, b) => 
            new Date(a.deadline) - new Date(b.deadline)
        );

        // Priority icons
        const priorityIcons = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };

        container.innerHTML = sortedTasks.map(task => `
            <div class="item priority-${task.priority} ${task.completed ? 'task-completed' : ''}">
                <div class="item-header">
                    <div class="item-title">${priorityIcons[task.priority]} ${task.title}</div>
                    <div class="item-actions">
                        <button class="btn btn-success" onclick="app.toggleTask(${task.id})" 
                                title="${task.completed ? 'Tandai belum selesai' : 'Tandai selesai'}">
                            ${task.completed ? '↶' : '✓'}
                        </button>
                        <button class="btn btn-danger" onclick="app.deleteItem('task', ${task.id})">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="item-content">
                    <div style="margin-bottom: 5px;">
                        📅 <strong>Deadline:</strong> ${new Date(task.deadline).toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                    <div>${task.description}</div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render catatan
     */
    renderNotes = () => {
        const container = document.getElementById('noteList');
        const { notes } = this.data;

        if (notes.length === 0) {
            container.innerHTML = '<div class="empty-state">Belum ada catatan</div>';
            return;
        }

        // Reverse untuk menampilkan catatan terbaru di atas (menggunakan spread operator)
        const reversedNotes = [...notes].reverse();

        container.innerHTML = reversedNotes.map(note => `
            <div class="item">
                <div class="item-header">
                    <div class="item-title">📄 ${note.title}</div>
                    <div class="item-actions">
                        <button class="btn btn-danger" onclick="app.deleteItem('note', ${note.id})">
                            🗑️ Hapus
                        </button>
                    </div>
                </div>
                <div class="item-content">
                    <div style="margin-bottom: 10px; white-space: pre-wrap;">${note.content}</div>
                    <small style="color: #999; font-size: 12px;">
                        🕒 ${note.createdAt}
                    </small>
                </div>
            </div>
        `).join('');
    }
}

// Export class
export default DashboardApp;
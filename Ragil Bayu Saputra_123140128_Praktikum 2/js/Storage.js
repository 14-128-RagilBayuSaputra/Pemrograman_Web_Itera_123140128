class Storage {
    constructor() {
        this.storageKey = 'personalDashboard';
    }

    /**
     * Arrow function untuk mendapatkan data dari localStorage
     * @returns {Object} Data yang tersimpan atau object kosong
     */
    getData = () => {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {
            schedules: [],
            tasks: [],
            notes: []
        };
    }

    /**
     * Arrow function untuk menyimpan data ke localStorage
     * @param {Object} data - Data yang akan disimpan
     */
    saveData = (data) => {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    /**
     * Arrow function untuk menghapus semua data
     */
    clearData = () => {
        localStorage.removeItem(this.storageKey);
    }

    /**
     * Arrow function untuk backup data
     * @returns {String} JSON string dari semua data
     */
    exportData = () => {
        const data = this.getData();
        return JSON.stringify(data, null, 2);
    }

    /**
     * Arrow function untuk restore data dari backup
     * @param {String} jsonString - JSON string untuk di-import
     */
    importData = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            this.saveData(data);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
}

// Export class untuk digunakan di file lain
export default Storage;
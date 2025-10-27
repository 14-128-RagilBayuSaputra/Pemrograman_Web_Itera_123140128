/**
 * ========================================
 * MAIN APPLICATION FILE
 * File utama untuk inisialisasi aplikasi
 * ========================================
 */

import DashboardApp from './app.js';

/**
 * Inisialisasi aplikasi setelah DOM loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Membuat instance aplikasi dan set ke global scope
    // agar bisa diakses dari onclick handler di HTML
    window.app = new DashboardApp();
    
    console.log('✅ Personal Dashboard berhasil diinisialisasi!');
    console.log('📦 Data tersimpan di localStorage dengan key: "personalDashboard"');
});

/**
 * Handle error global
 */
window.addEventListener('error', (event) => {
    console.error('❌ Error terjadi:', event.error);
});

/**
 * Handle unhandled promise rejection
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
});
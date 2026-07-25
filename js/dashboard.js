// =========================================
// == DASHBOARD - Sidebar Submenus ==
// =========================================
const toggleButtons = document.querySelectorAll('.toggle-submenu');

toggleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const submenu = this.nextElementSibling;
        const isOpen = this.classList.contains('open');

        document.querySelectorAll('.toggle-submenu').forEach(btn => {
            btn.classList.remove('open');
            btn.nextElementSibling.style.maxHeight = null;
        });

        if (!isOpen) {
            this.classList.add('open');
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
    });
});


// =========================================
// == DASHBOARD - Floating Menus (Topbar) ==
// =========================================
const btnNotif = document.getElementById('btnNotifications');
const menuNotif = document.getElementById('menuNotifications');
const btnProf = document.getElementById('btnProfile');
const menuProf = document.getElementById('menuProfile');

function closeAllFloatingMenus() {
    if (menuNotif) menuNotif.classList.remove('show');
    if (menuProf) menuProf.classList.remove('show');
}

if (btnNotif) {
    btnNotif.addEventListener('click', (e) => {
        e.stopPropagation();
        const isShowing = menuNotif.classList.contains('show');
        closeAllFloatingMenus();
        if (!isShowing) menuNotif.classList.add('show');
    });
}

if (btnProf) {
    btnProf.addEventListener('click', (e) => {
        e.stopPropagation();
        const isShowing = menuProf.classList.contains('show');
        closeAllFloatingMenus();
        if (!isShowing) menuProf.classList.add('show');
    });
}

// Cerrar menús al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative-container')) {
        closeAllFloatingMenus();
    }
});


// =========================================
// == DASHBOARD - Responsive Sidebar ==
// =========================================
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    if (sidebar) sidebar.classList.toggle('show');
    if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleSidebar);
}

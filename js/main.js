// Navbar scroll logic
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Load More Photos Logic
const toggleBtn = document.getElementById('togglePhotosBtn');
const hiddenPhotos = document.querySelectorAll('.toggle-photo');
let isExpanded = false;

toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;

    hiddenPhotos.forEach(photo => {
        if (isExpanded) {
            photo.classList.remove('hidden-photo');
        } else {
            photo.classList.add('hidden-photo');
        }
    });

    if (isExpanded) {
        toggleBtn.innerHTML = 'Mostrar menos fotos';
    } else {
        toggleBtn.innerHTML = 'Cargar más fotos';
        document.getElementById('photoGallery').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});

// Búsqueda y Filtros de la Galería
const searchInput = document.getElementById('gallerySearch');
const filterSelect = document.getElementById('galleryFilter');
const galleryItems = document.querySelectorAll('.gallery-item');

function filterGallery() {
    const query = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    const hasActiveFilter = query !== '' || filterValue !== 'all';

// Si el usuario usa un filtro, automáticamente mostramos las fotos ocultas para buscar en todo
    if (hasActiveFilter && !isExpanded) {
        isExpanded = true;
        hiddenPhotos.forEach(photo => photo.classList.remove('hidden-photo'));
        toggleBtn.innerHTML = 'Mostrar menos fotos';
toggleBtn.style.display = 'none'; // Ocultamos el botón al filtrar
} else if (!hasActiveFilter) {
toggleBtn.style.display = 'inline-block'; // Lo mostramos de nuevo
}

galleryItems.forEach(item => {
    const title = (item.getAttribute('data-title') || '').toLowerCase();
    const category = item.getAttribute('data-category') || '';

    const matchesSearch = title.includes(query);
    const matchesFilter = filterValue === 'all' || category.includes(filterValue);

    if (matchesSearch && matchesFilter) {
        item.classList.remove('d-none');
    } else {
        item.classList.add('d-none');
    }
});
}

searchInput.addEventListener('input', filterGallery);
filterSelect.addEventListener('change', filterGallery);

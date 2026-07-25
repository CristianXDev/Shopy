// =========================================
// == GLOBAL - Navbar Scroll Logic ==
// =========================================
const navbar = document.getElementById('mainNavbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


// =========================================
// == INDEX - Load More Photos Logic ==
// =========================================
const toggleBtn = document.getElementById('togglePhotosBtn');
const hiddenPhotos = document.querySelectorAll('.toggle-photo');
let isExpanded = false;

if (toggleBtn) {
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
}


// =========================================
// == INDEX - Gallery Search & Filter ==
// =========================================
const searchInput = document.getElementById('gallerySearch');
const filterSelect = document.getElementById('galleryFilter');
const galleryItems = document.querySelectorAll('.gallery-item');

if (searchInput && filterSelect) {
    function filterGallery() {
        const query = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;
        const hasActiveFilter = query !== '' || filterValue !== 'all';

        if (hasActiveFilter && !isExpanded) {
            isExpanded = true;
            hiddenPhotos.forEach(photo => photo.classList.remove('hidden-photo'));
            toggleBtn.innerHTML = 'Mostrar menos fotos';
            toggleBtn.style.display = 'none';
        } else if (!hasActiveFilter) {
            toggleBtn.style.display = 'inline-block';
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
}


// =========================================
// == ITEM / PRODUCT - Change Main Image ==
// =========================================
function changeMainImage(element, imageUrl) {
    const mainImage = document.getElementById('mainImage');
    if (!mainImage) return;

    mainImage.style.opacity = '0.5';
    setTimeout(() => {
        mainImage.src = imageUrl;
        mainImage.style.opacity = '1';
    }, 150);

    document.querySelectorAll('.thumbnail-wrapper').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}


// =========================================
// == ITEM / PRODUCT - Size Selector ==
// =========================================
document.querySelectorAll('.size-box:not(.text-muted)').forEach(box => {
    box.addEventListener('click', function () {
        document.querySelectorAll('.size-box').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const sizeName = document.getElementById('sizeName');
        if (sizeName) sizeName.textContent = this.textContent;
    });
});


// =========================================
// == ITEM / PRODUCT - Color Selector ==
// =========================================
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function () {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        const colorName = document.getElementById('colorName');
        if (colorName) colorName.textContent = this.getAttribute('data-name');
    });
});


// =========================================
// == ITEM / CART - Quantity Selector ==
// =========================================
function updateQty(change, inputId) {
    const id = inputId || 'qtyInput';
    const input = document.getElementById(id);
    if (!input) return;

    let currentVal = parseInt(input.value) || 1;
    let newVal = currentVal + change;
    if (newVal >= 1 && newVal <= 10) {
        input.value = newVal;
    }
}

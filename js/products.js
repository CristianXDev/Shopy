// =========================================
// == PRODUCTS - Filter, Search & Sort ==
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const categoryRadios = document.querySelectorAll(".filter-radio");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const searchBar = document.getElementById("searchBar");
    const sortSelect = document.getElementById("sortSelect");
    const discountFilter = document.getElementById("discountFilter");
    const resetBtn = document.getElementById("resetFilters");
    const productGrid = document.getElementById("productGrid");
    const products = Array.from(document.querySelectorAll(".product-item"));
    const productCount = document.getElementById("productCount");
    const noResults = document.getElementById("noResults");

    const sizeBoxes = document.querySelectorAll(".size-box");
    const colorSwatches = document.querySelectorAll(".color-swatch");

    let activeSizes = [];
    let activeColors = [];

    // Multi-selección de tallas
    sizeBoxes.forEach((box) => {
        box.addEventListener("click", () => {
            const size = box.getAttribute("data-size");
            if (box.classList.contains("active")) {
                box.classList.remove("active");
                activeSizes = activeSizes.filter((s) => s !== size);
            } else {
                box.classList.add("active");
                activeSizes.push(size);
            }
            filterAndSort();
        });
    });

    // Multi-selección de colores
    colorSwatches.forEach((swatch) => {
        swatch.addEventListener("click", () => {
            const color = swatch.getAttribute("data-color");
            if (swatch.classList.contains("active")) {
                swatch.classList.remove("active");
                activeColors = activeColors.filter((c) => c !== color);
            } else {
                swatch.classList.add("active");
                activeColors.push(color);
            }
            filterAndSort();
        });
    });

    // Filtrado y ordenación principal
    function filterAndSort() {
        const selectedCategory = document.querySelector(".filter-radio:checked").value;
        const maxPrice = parseInt(priceRange.value);
        const searchQuery = searchBar.value.trim().toLowerCase();
        const showOnlyDiscounts = discountFilter.checked;

        let visibleCount = 0;

        products.forEach((product) => {
            const category = product.getAttribute("data-category");
            const price = parseInt(product.getAttribute("data-price"));
            const title = product.getAttribute("data-title");
            const itemSizes = product.getAttribute("data-sizes").split(",");
            const itemColor = product.getAttribute("data-color");
            const isDiscounted = product.getAttribute("data-discount") === "true";

            const matchCategory = selectedCategory === "all" || selectedCategory === category;
            const matchPrice = price <= maxPrice;
            const matchSearch = title.includes(searchQuery);

            const matchSize = activeSizes.length === 0 || activeSizes.some((s) => itemSizes.includes(s));
            const matchColor = activeColors.length === 0 || activeColors.includes(itemColor);
            const matchDiscount = !showOnlyDiscounts || isDiscounted;

            if (matchCategory && matchPrice && matchSearch && matchSize && matchColor && matchDiscount) {
                product.classList.remove("d-none");
                visibleCount++;
            } else {
                product.classList.add("d-none");
            }
        });

        // Ordenación
        const sortValue = sortSelect.value;
        if (sortValue !== "default") {
            products.sort((a, b) => {
                const priceA = parseInt(a.getAttribute("data-price"));
                const priceB = parseInt(b.getAttribute("data-price"));
                const titleA = a.getAttribute("data-title");
                const titleB = b.getAttribute("data-title");

                if (sortValue === "price-asc") return priceA - priceB;
                if (sortValue === "price-desc") return priceB - priceA;
                if (sortValue === "title-asc") return titleA.localeCompare(titleB);
                return 0;
            });

            products.forEach((product) => productGrid.appendChild(product));
        }

        productCount.textContent = `Mostrando ${visibleCount} productos`;
        noResults.classList.toggle("d-none", visibleCount > 0);
    }

    // Event listeners
    categoryRadios.forEach((radio) => radio.addEventListener("change", filterAndSort));
    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = e.target.value;
        filterAndSort();
    });
    searchBar.addEventListener("input", filterAndSort);
    sortSelect.addEventListener("change", filterAndSort);
    discountFilter.addEventListener("change", filterAndSort);

    resetBtn.addEventListener("click", () => {
        document.getElementById("cat-all").checked = true;
        priceRange.value = 200;
        priceValue.textContent = "200";
        searchBar.value = "";
        sortSelect.value = "default";
        discountFilter.checked = false;

        sizeBoxes.forEach((b) => b.classList.remove("active"));
        colorSwatches.forEach((s) => s.classList.remove("active"));
        activeSizes = [];
        activeColors = [];

        filterAndSort();
    });

    filterAndSort();
});

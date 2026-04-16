document.addEventListener('DOMContentLoaded', () => {

    const productsGrid = document.getElementById('productsGrid');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    // Fetch and display products
    const loadProducts = async () => {
        if (!productsGrid) return; // Only run on index page

        productsGrid.innerHTML = '';
        loadingIndicator.style.display = 'block';

        const q = searchInput.value.trim();
        const category = categoryFilter.value;
        const queryParams = new URLSearchParams();
        if (q) queryParams.append('q', q);
        if (category) queryParams.append('category', category);

        try {
            const endpoint = `/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            const products = await apiCall(endpoint);
            
            loadingIndicator.style.display = 'none';

            if (products.length === 0) {
                productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">No products found.</p>';
                return;
            }

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.onclick = () => window.location.href = `product.html?id=${product._id}`;

                const imageUrl = product.imageUrl.startsWith('http') 
                    ? product.imageUrl 
                    : `http://127.0.0.1:5000${product.imageUrl}`;

                card.innerHTML = `
                    <img src="${imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title" title="${product.title}">${product.title}</h3>
                        <div class="product-price">$${product.price.toLocaleString()}</div>
                    </div>
                `;
                productsGrid.appendChild(card);
            });
        } catch (error) {
            loadingIndicator.style.display = 'none';
            productsGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--danger);">Failed to load products: ${error.message}</p>`;
        }
    };

    // Initial Load
    loadProducts();

    // Handle Search
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loadProducts();
        });
    }

});

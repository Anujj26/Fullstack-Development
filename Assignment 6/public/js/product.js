document.addEventListener('DOMContentLoaded', async () => {
    
    const productContainer = document.getElementById('productContainer');
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        productContainer.innerHTML = '<p class="error">Product not found.</p>';
        return;
    }

    try {
        const product = await apiCall(`/products/${productId}`);
        const user = JSON.parse(localStorage.getItem('user'));
        
        const imageUrl = product.imageUrl.startsWith('http') 
            ? product.imageUrl 
            : `http://127.0.0.1:5000${product.imageUrl}`;

        // Check if current user is seller
        const isSeller = user && product.seller && user.id === product.seller._id;
        
        let actionsHtml = '';
        if (isSeller) {
            actionsHtml = `
                <div style="margin-top: 2rem;">
                    <button id="deleteBtn" class="btn btn-danger">Delete Product</button>
                </div>
            `;
        } else {
            actionsHtml = `
                <div style="margin-top: 2rem;">
                    <button id="buyBtn" class="btn btn-primary" style="font-size: 1.25rem; padding: 1rem 2rem;">Buy Now</button>
                </div>
            `;
        }

        productContainer.innerHTML = `
            <a href="index.html" style="display: inline-block; margin-bottom: 1rem;">&larr; Back to Results</a>
            <div class="product-details">
                <div>
                    <img src="${imageUrl}" alt="${product.title}" class="product-details-img" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
                </div>
                <div>
                    <span class="product-category" style="font-size: 0.875rem;">${product.category}</span>
                    <h1 style="margin-bottom: 1rem; font-size: 2.5rem;">${product.title}</h1>
                    <div class="product-price" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 2rem;">$${product.price.toLocaleString()}</div>
                    
                    <h3>Description</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">${product.description}</p>
                    
                    <div class="seller-info">
                        <h3>Seller Information</h3>
                        <p><strong>Name:</strong> ${product.seller.name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${product.seller.email}">${product.seller.email}</a></p>
                        <p><strong>Phone:</strong> <a href="tel:${product.seller.phone}">${product.seller.phone}</a></p>
                    </div>

                    ${actionsHtml}
                </div>
            </div>
        `;

        if (isSeller) {
            document.getElementById('deleteBtn').addEventListener('click', async () => {
                if(confirm('Are you sure you want to delete this product?')) {
                    try {
                        await apiCall(`/products/${productId}`, { method: 'DELETE' });
                        showToast('Product deleted');
                        setTimeout(() => window.location.href = 'index.html', 1000);
                    } catch (error) {
                        showToast(error.message, 'error');
                    }
                }
            });
        } else if (document.getElementById('buyBtn')) {
            document.getElementById('buyBtn').addEventListener('click', () => {
                if (!user) {
                    showToast('Please login to buy products', 'error');
                    setTimeout(() => window.location.href = 'login.html', 1500);
                    return;
                }
                
                // Simulate buy checkout
                const btn = document.getElementById('buyBtn');
                btn.innerText = 'Processing...';
                btn.disabled = true;
                
                setTimeout(() => {
                    showToast('Purchase Successful! The seller has been notified.', 'success');
                    btn.innerText = 'Purchased';
                }, 1500);
            });
        }

    } catch (error) {
        productContainer.innerHTML = `<p class="error" style="color: var(--danger); text-align: center;">Failed to load product details: ${error.message}</p>`;
    }

});

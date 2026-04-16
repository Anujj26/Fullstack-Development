document.addEventListener('DOMContentLoaded', () => {
    
    // Auth Check: Redirect if not logged in
    if (!getToken()) {
        showToast('Please login to post an ad', 'error');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    const addProductForm = document.getElementById('addProductForm');
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const price = document.getElementById('price').value;
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const imageFile = document.getElementById('image').files[0];

            if (!imageFile) {
                return showToast('Please select an image', 'error');
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('image', imageFile); // 'image' matches Multer's upload.single('image')

            try {
                // Cannot use standard apiCall for FormData directly because of Content-Type string setup, Let's fetch directly.
                const token = getToken();
                const response = await fetch(`${API_URL}/products`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        // Do not set Content-Type for FormData, browser does it with boundary
                    },
                    body: formData
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong');
                }

                showToast('Product added successfully!');
                setTimeout(() => window.location.href = `product.html?id=${data._id}`, 1000);
            } catch (error) {
                showToast(error.message, 'error');
            }
        });
    }

});

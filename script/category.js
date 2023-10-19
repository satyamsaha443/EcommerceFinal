document.addEventListener("DOMContentLoaded", function() {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    displayCategories(storedCategories);
});

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'btn btn-outline-primary m-2';
        categoryBtn.innerText = category;

        // Attach click event to filter products by category
        categoryBtn.onclick = () => {
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            filterProductsByCategory(category, storedProducts);
        };

        categoriesContainer.appendChild(categoryBtn);
    });
}

function filterProductsByCategory(category, products) {
    let filteredProducts = [];

    // Filter products by selected category
    if (category === 'Men') {
        filteredProducts = products.filter(product => product.category === 'Men\'s Clothing');
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }

    const productsContainer = document.getElementById('category-products');
    productsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'prod';

        productDiv.innerHTML = `
            <div class="card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Price:</strong> ₹${product.price}</p>
                        <button class="btn-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.category}', '${product.description}', '${product.image}')">Add to Cart</button>
                    </div>
                </a>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Attach click event to category links
    const categoryLinks = document.querySelectorAll(".category-link");
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const categoryName = this.getAttribute('data-category');
            
            if(categoryName === "Pre-Fall") {
                // Fetch products for Men's category from FakeStore API
                fetch('https://fakestoreapi.com/products/category/men%20clothing')
                .then(response => response.json())
                .then(products => {
                    // Handle the products here, display them or do whatever you want
                    displayProducts(products);
                });
            }
            // ... handle other categories similarly
        });
    });
});

function displayProducts(products) {
    const productsContainer = document.getElementById('category-products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'prod';

        productDiv.innerHTML = `
            <div class="card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <button class="btn-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.category}', '${product.description}', '${product.image}')">Add to Cart</button>
                    </div>
                </a>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });
}

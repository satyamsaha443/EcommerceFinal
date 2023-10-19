document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });

      
});

// ... (rest of the scripts.js file)

function displayProducts(products) {
    const productsContainer = document.getElementById('products');

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
                        <p><strong>Price:</strong> ₹${product.price}</p>
                        
<p><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count} reviews)</p>


                        <button class="btn-cart" onclick="addToCart(event, ${product.id}, '${product.title}', ${product.price}, '${product.category}', '${product.description}', '${product.image}', '${product.rating}')">
                        Add to Cart
                      </button>                                             
                    </div>
                </a>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            displayProducts(data);

            // Extract and store unique categories
            const categoriesSet = new Set(data.map(product => product.category));
            localStorage.setItem('categories', JSON.stringify([...categoriesSet]));

            // Store all products to localStorage for category-based filtering
            localStorage.setItem('products', JSON.stringify(data));
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});


function addToCart(event, productID, productName, productPrice, productCategory, productDescription, productImage) {
    event.preventDefault();
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === productID);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({
            id: productID,
            name: productName,
            price: productPrice,
            category: productCategory,
            description: productDescription,
            image: productImage,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Redirect to cart page
    window.location.href = 'cart.html';
  
}



document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            displayProducts(data);

            // Extract and store unique categories
            const categoriesSet = new Set(data.map(product => product.category));
            localStorage.setItem('categories', JSON.stringify([...categoriesSet]));

            // Store all products to localStorage for category-based filtering
            localStorage.setItem('products', JSON.stringify(data));

            // Initialize price range filter
            setPriceRange(data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
        const sortOptions = document.querySelectorAll('.dropdown-item');
        sortOptions.forEach(option => {
            option.addEventListener('click', function(event) {
                event.preventDefault();
                sortAndDisplayProducts(event.target.getAttribute('data-sort'));
            });
        });
});



function filterProductsByPrice(price) {
  const originalProducts = JSON.parse(localStorage.getItem('products'));
  const filteredProducts = originalProducts.filter(product => product.price <= price);
  localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
  displayProducts(filteredProducts);
}

function sortAndDisplayProducts(sortType) {
    const products = JSON.parse(localStorage.getItem('products'));
    let sortedProducts;

    switch (sortType) {
        case "priceHighToLow":
            sortedProducts = [...products].sort((a, b) => b.price - a.price);
            break;
        case "priceLowToHigh":
            sortedProducts = [...products].sort((a, b) => a.price - b.price);
            break;
        case "titleAZ":
            sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "ratingHighToLow":
            sortedProducts = [...products].sort((a, b) => b.rating.rate - a.rating.rate);
            break;
        case "ratingLowToHigh":
            sortedProducts = [...products].sort((a, b) => a.rating.rate - b.rating.rate);
            break;
        default:
            sortedProducts = products;
            break;
    }

    displayProducts(sortedProducts);
}
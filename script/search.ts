document.addEventListener("DOMContentLoaded", function() { fetch('https://fakestoreapi.com/products') .then(res => res.json()) .then((data: Product[]) => { displayProducts(data);

        // Store all products to localStorage for search
        localStorage.setItem('products', JSON.stringify(data));
    })
    .catch((error: Error) => {
        console.error("Error fetching products:", error);
    });
});

function displayProducts(products: Product[]) { const productsContainer = document.getElementById('products');

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

                    <button class="btn-cart" onclick="addToCart(event, ${product.id}, '${product.title}', ${product.price}, '${product.category}', '${product.description}', '${product.image}')">
                    Add to Cart
                  </button>                                             
                </div>
            </a>
        </div>
    `;

    productsContainer?.appendChild(productDiv);
});
}


function searchProducts(searchTerm: string) { 
    const productsContainer = document.getElementById('products');
     const products: Product[] = JSON.parse(localStorage.getItem('products')!);
      const filteredProducts = products.filter(product => { 
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
     });

// Clear previous products
while (productsContainer?.firstChild) {
    productsContainer?.removeChild(productsContainer?.lastChild!);
}

if(filteredProducts.length === 0) {
    productsContainer!.innerHTML = `<h3>No products found for "${searchTerm}"</h3>`;
} else {
    displayProducts(filteredProducts);
}
}


const searchInput = document.querySelector('.form-control') as HTMLInputElement;
 const searchBtn = document.querySelector('.input-group-text');

searchBtn?.addEventListener('click', (event: MouseEvent) => {
     event.preventDefault(); searchProducts(searchInput.value);
     });

searchInput?.addEventListener('keyup', (event: KeyboardEvent) => {
     if (event.keyCode === 13) { event.preventDefault();
         searchProducts(searchInput.value); } });

searchInput?.addEventListener('search', (event: Event) => {
    event.preventDefault(); searchProducts(searchInput.value);
 });
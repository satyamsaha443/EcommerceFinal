document.addEventListener("DOMContentLoaded", function(){
    fetch("https://fakestoreapi.com/products") .then((res) => res.json())
    .then((data) => {displayProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
    })
    .catch((error) => {
        console.error("Error fetching products:", error);
    });
});

interface Product{
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
}

function displayProducts(products: Product[]){
    const productsContainer = document.getElementById("products");
    products.forEach((product) => {const productDiv = document.createElement("div"); productDiv.className = "prod";
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

productsContainer.appendChild(productDiv);
}); 
}

function sortProducts(sortMethod: string){
    const productsContainer: HTMLElement = document.getElementById("products");
    let products: Product[] = JSON.parse(localStorage.getItem("products"));

    switch(sortMethod){
        case "priceHighToLow": products.sort((a: Product, b: Product) => b.price - a.price);
        break;
        case "priceLowToHigh": products.sort((a:Product, b:Product)=> a.price- b.price);
        break;
        case "titleAZ": products.sort((a:Product, b.Product) => a.title.localeCompare(b.title));
        break;
        default:
        break;
    }
    while(productsContainer.firstChild){
        productsContainer.removeChild(productsContainer.lastChild);
    }
    displayProducts(products);
}
const sortDropdown: HTMLElement = document.querySelector(".dropdown-menu");

sortDropdown.addEventListener("click", (event: MouseEvent) => { event.preventDefault(); if (event.target.classList.contains("dropdown-item")) { const sortMethod: string = event.target.getAttribute("data-sort"); sortProducts(sortMethod);

sortDropdown.querySelector(".active").classList.remove("active");
event.target.classList.add("active");                 
} });

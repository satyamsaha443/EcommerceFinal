document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      displayProducts(data);

      // Store all products to localStorage for sorting and filtering
      localStorage.setItem("products", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});

function displayProducts(products) {
  const productsContainer = document.getElementById("products");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "prod";

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

function sortProducts(sortMethod) {
  const productsContainer = document.getElementById("products");
  let products = JSON.parse(localStorage.getItem("products"));

  switch (sortMethod) {
    case "priceHighToLow":
      products.sort((a, b) => b.price - a.price);
      break;
    case "priceLowToHigh":
      products.sort((a, b) => a.price - b.price);
      break;
    case "titleAZ":
      products.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  while (productsContainer.firstChild) {
    productsContainer.removeChild(productsContainer.lastChild);
  }

  displayProducts(products);
}

const sortDropdown = document.querySelector(".dropdown-menu");

sortDropdown.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("dropdown-item")) {
    const sortMethod = event.target.getAttribute("data-sort");
    sortProducts(sortMethod);
    
    sortDropdown.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
  }
});

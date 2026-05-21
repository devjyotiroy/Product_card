const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

let allProducts = [];

function createPrice() {
  return Math.floor(Math.random() * 5000) + 500;
}

function renderProducts(products) {
  container.innerHTML = "";

  if (!products.length) {
    noResults.style.display = "block";
    resultsCount.textContent = "0 products found";
    return;
  }

  noResults.style.display = "none";
  resultsCount.textContent = `${products.length} product${products.length > 1 ? "s" : ""} found`;

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img class="product-image" src="${product.thumbnailUrl}" alt="${product.title}" />
      <div class="card-content">
        <h3>${product.title}</h3>
        <p>Premium quality product with a clean and modern layout.</p>
        <div class="card-meta">
          <div class="price">₹${createPrice()}</div>
          <div class="tag">New</div>
        </div>
        <button class="cart-btn">Add to Cart</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function filterProducts() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  renderProducts(filtered);
}

resultsCount.textContent = "Loading products...";
container.innerHTML = `<p class="loading">Loading products...</p>`;

fetch("https://jsonplaceholder.typicode.com/photos")
  .then(response => response.json())
  .then(data => {
    allProducts = data.slice(0, 20);
    renderProducts(allProducts);
  })
  .catch(error => {
    container.innerHTML = `<p class="loading">Error loading products.</p>`;
    resultsCount.textContent = "Unable to load products";
    console.log(error);
  });

searchInput.addEventListener("input", filterProducts);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  filterProducts();
  searchInput.focus();
});

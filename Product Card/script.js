const container = document.getElementById("product-container");

fetch("https://jsonplaceholder.typicode.com/photos")
  .then(response => response.json())
  .then(data => {
    const products = data.slice(0, 20); 

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <div class="card-content">
          <h3>${product.title}</h3>
          <p>Sample product description from JSONPlaceholder</p>
          <div class="price">₹${Math.floor(Math.random() * 5000) + 500}</div>
          <button>Add to Cart</button>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    container.innerHTML = `<p>Error loading products.</p>`;
    console.log(error);
  });
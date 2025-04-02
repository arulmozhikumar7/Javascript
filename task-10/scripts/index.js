document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("products");
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const clearCartBtn = document.getElementById("clear-cart");
  const searchInput = document.getElementById("search");
  const cartBtn = document.getElementById("cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.getElementById("close-cart");
  const cartCount = document.getElementById("cart-count");
  const popup = document.getElementById("popup");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  async function fetchProducts(query = "") {
    const url = query
      ? `https://dummyjson.com/products/search?q=${query}`
      : "https://dummyjson.com/products";
    const response = await fetch(url);
    const data = await response.json();
    renderProducts(data.products);
  }

  function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("bg-white", "p-4", "rounded", "shadow-md");
      productDiv.innerHTML = `
                    <img src="${product.thumbnail}" alt="${
        product.title
      }" class="w-full h-40 object-cover rounded">
                    <h3 class="text-lg font-bold mt-2">${product.title}</h3>
                    <p class="text-sm">${product.description}</p>
                    <p class="font-bold">$${product.price.toFixed(2)}</p>
                    <p class="text-sm text-gray-500">Discount: ${
                      product.discountPercentage
                    }%</p>
                    <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onclick="addToCart(${
                      product.id
                    }, '${product.title}', ${product.price}, ${
        product.discountPercentage
      })">Add to Cart</button>
                `;
      productContainer.appendChild(productDiv);
    });
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let totalItems = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      const discountedPrice = item.price * (1 - item.discount / 100);
      li.classList.add("flex", "justify-between", "border-b", "py-2");
      li.innerHTML = `
                    <span>${item.name} (x${item.quantity}) - $${(
        discountedPrice * item.quantity
      ).toFixed(2)}</span>
                    <div>
                        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="removeFromCart(${
                          item.id
                        })">-</button>
                        <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="increaseQuantity(${
                          item.id
                        })">+</button>
                    </div>
                `;
      cartItems.appendChild(li);
      total += discountedPrice * item.quantity;
      totalItems += item.quantity;
    });
    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = totalItems;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.addToCart = (id, name, price, discount) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
      showPopup();
    } else {
      cart.push({ id, name, price, discount, quantity: 1 });
    }
    renderCart();
    showPopup();
  };

  function showPopup() {
    popup.classList.remove("hidden");
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 2000);
  }

  window.removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart = cart.filter((i) => i.id !== id);
    }
    renderCart();
  };

  window.increaseQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.quantity++;
    }
    renderCart();
  };

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });

  cartBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  searchInput.addEventListener("input", (e) => {
    fetchProducts(e.target.value);
  });

  fetchProducts();
  renderCart();
});

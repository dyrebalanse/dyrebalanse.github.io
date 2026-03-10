diff --git a/script.js b/script.js
index 065076b617ffa32cffcdfc502be76e7e082ef053..384b0a58250abbb064ea7873afe08c72d74b1f9e 100644
--- a/script.js
+++ b/script.js
@@ -1,21 +1,171 @@
-let cart = JSON.parse(localStorage.getItem("cart")) || [];
+const CART_KEY = "dyrebalanseCart";
 
+const PAYMENT_LINKS = {
+  stripe: "https://buy.stripe.com/test_placeholder",
+  vipps: "https://example.com/vipps-placeholder"
+};
 
-function addToCart(name, price){
+function getCart() {
+  try {
+    const cart = JSON.parse(localStorage.getItem(CART_KEY));
+    return Array.isArray(cart) ? cart : [];
+  } catch {
+    return [];
+  }
+}
+
+function saveCart(cart) {
+  localStorage.setItem(CART_KEY, JSON.stringify(cart));
+}
+
+function getTotal(cart) {
+  return cart.reduce((sum, item) => sum + item.price, 0);
+}
+
+function formatCurrency(amount) {
+  return `${amount} kr`;
+}
 
-cart.push({name, price});
+function addToCart(name, price) {
+  const cart = getCart();
+  cart.push({ name, price });
+  saveCart(cart);
+  updateShopSummary();
+}
 
-localStorage.setItem("cart", JSON.stringify(cart));
+function removeFromCart(index) {
+  const cart = getCart();
+  cart.splice(index, 1);
+  saveCart(cart);
+  renderCartPage();
+  updateShopSummary();
+}
 
-alert(name + " lagt i handlekurv");
+function clearCart() {
+  localStorage.removeItem(CART_KEY);
+  renderCartPage();
+  updateShopSummary();
+}
 
-updateCart();
+function updateShopSummary() {
+  const countElement = document.getElementById("cartCount");
+  const amountElement = document.getElementById("cartAmount");
+  if (!countElement || !amountElement) {
+    return;
+  }
 
+  const cart = getCart();
+  countElement.textContent = String(cart.length);
+  amountElement.textContent = formatCurrency(getTotal(cart));
 }
 
+function renderCartPage() {
+  const cartItems = document.getElementById("cartItems");
+  const totalPrice = document.getElementById("totalPrice");
+  if (!cartItems || !totalPrice) {
+    return;
+  }
+
+  const cart = getCart();
+  cartItems.innerHTML = "";
+
+  if (cart.length === 0) {
+    cartItems.innerHTML = "<p>Handlekurven er tom.</p>";
+  }
+
+  cart.forEach((item, index) => {
+    const row = document.createElement("div");
+    row.className = "cart-item";
+    row.innerHTML = `
+      <span>${item.name}</span>
+      <span>${formatCurrency(item.price)}</span>
+      <button type="button" data-remove-index="${index}">Fjern</button>
+    `;
+    cartItems.appendChild(row);
+  });
+
+  totalPrice.textContent = `Totalt: ${formatCurrency(getTotal(cart))}`;
+
+  cartItems.querySelectorAll("[data-remove-index]").forEach((button) => {
+    button.addEventListener("click", () => {
+      removeFromCart(Number(button.dataset.removeIndex));
+    });
+  });
+}
 
-function updateCart(){
+function setupShopPage() {
+  document.querySelectorAll("[data-product]").forEach((button) => {
+    button.addEventListener("click", () => {
+      const name = button.dataset.product;
+      const price = Number(button.dataset.price || 0);
+      addToCart(name, price);
+      const originalLabel = button.textContent;
+      button.textContent = "Lagt til";
+      setTimeout(() => {
+        button.textContent = originalLabel;
+      }, 1000);
+    });
+  });
 
-let total = 0;
+  updateShopSummary();
+}
+
+function setupCheckoutButton() {
+  const checkoutButton = document.getElementById("checkoutButton");
+  const paymentSelect = document.getElementById("paymentMethod");
+  const message = document.getElementById("checkoutMessage");
+  const clearButton = document.getElementById("clearCartButton");
+  if (!checkoutButton || !paymentSelect || !message) {
+    return;
+  }
+
+  checkoutButton.addEventListener("click", () => {
+    const cart = getCart();
+
+    if (cart.length === 0) {
+      message.textContent = "Legg til produkter før betaling.";
+      return;
+    }
+
+    const method = paymentSelect.value;
+    const url = PAYMENT_LINKS[method];
+
+    if (!url || url.includes("placeholder")) {
+      message.textContent = "Betalingslenke mangler. Legg inn ekte lenker i script.js før lansering.";
+      return;
+    }
+
+    window.location.href = url;
+  });
+
+  clearButton?.addEventListener("click", clearCart);
+}
+
+
+function setupNewsletterForm() {
+  const emailInput = document.getElementById("newsletterEmail");
+  const button = document.getElementById("newsletterButton");
+  const message = document.getElementById("newsletterMessage");
+
+  if (!emailInput || !button || !message) {
+    return;
+  }
+
+  button.addEventListener("click", () => {
+    const value = emailInput.value.trim();
+    if (!value || !value.includes("@")) {
+      message.textContent = "Skriv inn en gyldig e-postadresse.";
+      return;
+    }
+
+    message.textContent = "Takk! Du er registrert for oppdateringer.";
+    emailInput.value = "";
+  });
+}
 
-cart.forEach(item => total += item.price);
+document.addEventListener("DOMContentLoaded", () => {
+  setupShopPage();
+  renderCartPage();
+  setupCheckoutButton();
+  setupNewsletterForm();
+});

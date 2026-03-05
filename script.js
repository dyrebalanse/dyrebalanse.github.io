let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(name, price){

cart.push({name, price});

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " lagt i handlekurv");

updateCart();

}


function updateCart(){

let total = 0;

cart.forEach(item => total += item.price);

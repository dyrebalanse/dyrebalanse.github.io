let cart = [];

function addToCart(name, price){

cart.push({name, price});

alert(name + " lagt i handlekurv");

updateCart();
}

function updateCart(){

let total = 0;

cart.forEach(item => total += item.price);

document.getElementById("cartTotal").innerText =
"Handlekurv: " + cart.length + " varer | " + total + " kr";

}

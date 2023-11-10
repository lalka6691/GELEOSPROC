function cartOpen(){
    var cart = document.getElementById("cart");
    cart.classList.remove('hidden');
}

document.addEventListener('click', function(e) {
    var cart = document.getElementById('cart');
    if (!e.target.matches('.cart, .cart *, .btn')) {
        cart.classList.add('hidden');
    }  
  });

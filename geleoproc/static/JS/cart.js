
let cnt_cpu_item;
let myData;

document.addEventListener("DOMContentLoaded", function() {
    let json_data = document.getElementById('myDataElement').getAttribute('data-django-variable');
    myData = JSON.parse(json_data);
    cnt_cpu_item = myData["cnt_cart_items"];
  });

function cartOpen(){
    var cart = document.getElementById("cart");
    if (cart === null){
      cartCreate();
      addCartItems(); 
      if (cnt_cpu_item === 0){
        var emptyCart = document.createElement('p');
        emptyCart.textContent = 'Корзина пуста';
        cartContainer.appendChild(emptyCart);
      }
    }
    else{
      cartDelete(cart);
    }
    
    // cart.classList.toggle('hidden');
}

document.addEventListener('click', function(e) {
    var cart = document.getElementById('cart');
    if (cart !== null)
    {
      if (!e.target.matches('.cart, .cart *, .btn')) {
      cartDelete(cart);
    }  
  }
  });

function cartCreate(){
    
    var cart = document.createElement('div');
    cart.className = 'cart animated';
    cart.id = 'cart';

    var clearButton = document.createElement('button');
    clearButton.className = 'clear_cart';
    clearButton.textContent = 'Очистить корзину';
    clearButton.onclick = cartEmpty;
    cart.appendChild(clearButton);

    var cartContainer = document.createElement('div');
    cartContainer.id = 'cartContainer';
    cart.appendChild(cartContainer);

    var toCartBtn = document.createElement('a');
    toCartBtn.className = 'cart_btn';
    toCartBtn.textContent = 'В корзину';
    toCartBtn.href = '/WIP/';
    cart.appendChild(toCartBtn);

    document.body.appendChild(cart);
}

function cartDelete(cart){

  cart.classList.add('animated-fade-out');

  cart.addEventListener('animationend', function() {
  
  cart.remove();
  });
}

function addCartItems() {
  console.log(cnt_cpu_item);
  for (let key in myData){
    if (key === 'cnt_cart_items') continue;
    
    var cartItem = document.createElement('div');
    cartItem.className = 'cart_elem';
    cartItem.innerHTML = `
      <div class="cart_elem_1">
          <p class="processor_name">${key}</p>
          <p class="count">${myData[key].Count} шт.</p>
      </div>
      <div class="cart_elem_2">
          <button name="${key}" class="delete_cart_elem" onClick="deleteCartItem(this.name)">X</button>
          <p class="processor_cost">${myData[key].Cost}$</p>
      </div>
    `;

    cartContainer.appendChild(cartItem);
    }
  
}

function cartEmpty(){
    cnt_cpu_item = 0;
    myData = {
      'cnt_cart_items': 0
    }
    var cart = document.getElementById('cart');
    cartDelete(cart);
}

function cpuAddToCart(cpuName, cpuCost){

  var cart = document.getElementById('cart');

  if (cpuName in myData){
    myData[cpuName].Count += 1;
    myData[cpuName].Cost += Number(cpuCost);
  }
  else {
    myData[cpuName] = {
      'Cost': Number(cpuCost),
      'Count': 1,
    }
    cnt_cpu_item += 1;
  }
  if (cart !== null) cartDelete(cart);
}

function deleteCartItem(cpuName){
  var cart = document.getElementById('cart');
  delete myData[cpuName];
  if (cart !== null) cartDelete(cart);
  cnt_cpu_item -= 1;
}

window.addEventListener('beforeunload', function(event) {
  // Ваш код, который нужно выполнить перед выгрузкой страницы
  // Например, сохранение данных, отправка запросов на сервер и так далее...
  console.log('Страница закрывается!');

});
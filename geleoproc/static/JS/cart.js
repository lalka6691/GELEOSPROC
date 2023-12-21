
let cnt_cpu_item;
let myData;

document.addEventListener("DOMContentLoaded", function() 
  {
    let json_data = document.getElementById('myDataElement').getAttribute('data-django-variable');
    myData = JSON.parse(json_data);
    cnt_cpu_item = myData["cnt_cart_items"];
  }
);

function cartOpen(){
  let cart = document.getElementById("cart");
  if (cart === null)
  {
    cartCreate();
    addCartItems(); 
    if (cnt_cpu_item === 0)
    {
      var emptyCart = document.createElement('p');
      emptyCart.textContent = 'Корзина пуста';
      emptyCart.style.fontFamily = "'Trebuchet MS', Helvetica, sans-serif";
      emptyCart.style.color = "White";
      emptyCart.style.textShadow = "1px 1px 2px black";
      cartContainer.appendChild(emptyCart);
    }
  }
  else
  {
    cartDelete(cart);
  }
}

document.addEventListener('click', function(e) 
  {
    let cart = document.getElementById('cart');
    let icon = document.getElementById('icon');
    if (cart !== null)
    {
      if (!e.target.matches('.cart, .cart *, .btn, #icon') && e.target !== icon) 
      {
      cartDelete(cart);
      }  
    }
  }
);

function cartCreate(){
  let cart = document.createElement('div');
  cart.className = 'cart animated glass';
  cart.id = 'cart';

  if (cnt_cpu_item !== 0)
  {
    let clearButton = document.createElement('button');
    clearButton.className = 'clear_cart';
    clearButton.textContent = 'Очистить корзину';
    clearButton.onclick = cartEmpty;
    cart.appendChild(clearButton);
  }
  let cartContainer = document.createElement('div');
  cartContainer.id = 'cartContainer';
  cart.appendChild(cartContainer);

  if (cnt_cpu_item !== 0)
  {
    let toCartBtn = document.createElement('a');
    toCartBtn.className = 'cart_btn';
    toCartBtn.textContent = 'В избранное';
    toCartBtn.href = '/cart/';
    cart.appendChild(toCartBtn);
  }

  document.body.appendChild(cart);
}

function cartDelete(cart){
  cart.classList.add('animated-fade-out');

  cart.addEventListener('animationend', function() 
  {
  cart.remove();
  }
  );
}

function addCartItems() {
  for (let key in myData){
    if (key === 'cnt_cart_items') continue;
    
    let cartItem = document.createElement('div');
    cartItem.className = 'cart_elem glass';
    cartItem.innerHTML = `
      <div class="cart_elem_1">
        <p class="processor_name">${key}</p>
        <div class="cart_name_count">
          <button name="${key}" class="cart_minus" onClick="CartItemMinus(this)">-</button>
          <p class="count">${myData[key].Count} шт.</p>
          <button name="${key}" class="cart_plus" onClick="CartItemPlus(this)">+</button>
        </div>
      </div>
      <div class="cart_elem_2">
          <button name="${key}" class="delete_cart_elem" onClick="deleteCartItem(this)">X</button>
          <p class="processor_cost">${myData[key].CostAll}₽</p>
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
  let cart = document.getElementById('cart');
  cartDelete(cart);
}

function cpuAddToCart(cpuName, cpuCost){

  let cart = document.getElementById('cart');

  if (cpuName in myData){
    myData[cpuName].Count += 1;
    myData[cpuName].CostAll = myData[cpuName].CostOne * myData[cpuName].Count;
  }
  else {
    myData[cpuName] = {
      'CostOne': Number(cpuCost),
      'CostAll': Number(cpuCost),
      'Count': 1,
    }
    cnt_cpu_item += 1;
  }
  if (cart !== null) cartDelete(cart);
  
}

function deleteCartItem(cpuName){
  let cart = document.getElementById('cart');
  delete myData[cpuName.name];
  if (cart !== null) cartDelete(cart);
  cnt_cpu_item -= 1;
}

function CartItemPlus(CartElem){
  cpuName = CartElem.name;
  myData[cpuName].Count += 1;
  myData[cpuName].CostAll += myData[cpuName].CostOne;
  let cartElem1 = CartElem.parentElement.parentElement;
  let processorCostElement = cartElem1.nextElementSibling.querySelector('.processor_cost');
  processorCostElement.textContent = `${myData[cpuName].CostAll}₽`;
  CartElem.previousSibling.previousSibling.textContent = String(myData[cpuName].Count) + ' ' + 'шт.';
}

function CartItemMinus(CartElem){
  cpuName = CartElem.name;
  if (myData[cpuName].Count === 1){
    deleteCartItem(CartElem);
    return
  }
  myData[cpuName].Count -= 1;
  myData[cpuName].CostAll -= myData[cpuName].CostOne;
  let cartElem1 = CartElem.parentElement.parentElement;
  let processorCostElement = cartElem1.nextElementSibling.querySelector('.processor_cost');
  processorCostElement.textContent = `${myData[cpuName].CostAll}₽`;
  CartElem.nextSibling.nextSibling.textContent = String(myData[cpuName].Count) + ' ' + 'шт.';
}



window.addEventListener('beforeunload', function(event) 
  {
    myData['cnt_cart_items'] = cnt_cpu_item;

    let data = myData;

    let xhr = new XMLHttpRequest();
    
    let csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

    xhr.open('POST', '/ajax_post_cart/', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('X-CSRFToken', csrfToken);

    xhr.send(JSON.stringify(data));
  }
);


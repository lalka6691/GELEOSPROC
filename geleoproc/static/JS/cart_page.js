
let cnt_cpu_item;
let myData;

document.addEventListener("DOMContentLoaded", function() {
    let json_data = document.getElementById('myDataElement').getAttribute('data-django-variable');
    myData = JSON.parse(json_data);
    cnt_cpu_item = myData["cnt_cart_items"];
    drawCart();
  });

function drawCart(){
    if (cnt_cpu_item === 0) {

    }
    else {
      let cart = document.createElement('div');
      cart.className = 'cart';
      cart.id = 'cart';

      let clearButton = document.createElement('button');
      clearButton.className = 'clear_cart';
      clearButton.textContent = 'Очистить корзину';
      clearButton.onclick = cartEmpty;
      cart.appendChild(clearButton);

      let cartContainer = document.createElement('div');
      cartContainer.id = 'cartContainer';
      cart.appendChild(cartContainer);

      document.body.appendChild(cart);
    }
}

function addCartItems() {
  for (let key in myData){
    if (key === 'cnt_cart_items') continue;
    
    let cartItem = document.createElement('div');
    cartItem.className = 'cart_elem';
    cartItem.innerHTML = `
      <div class="cart_elem_1">
        <p class="processor_name">${key}</p>
        <div class="cart_name_count">
          <button name="${key}" class="cart_plus_minus" onClick="CartItemMinus(this)">-</button>
          <p class="count">${myData[key].Count} шт.</p>
          <button name="${key}" class="cart_plus_minus" onClick="CartItemPlus(this)">+</button>
        </div>
      </div>
      <div class="cart_elem_2">
          <button name="${key}" class="delete_cart_elem" onClick="deleteCartItem(this)">X
          <p class="processor_cost">${myData[key].Cost}$</p>
      </div>
    `;

    cartContainer.appendChild(cartItem);
    }
  
}
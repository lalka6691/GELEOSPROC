
let cnt_cpu_item;
let myData;

document.addEventListener("DOMContentLoaded", function() {
  
  let json_data = document.getElementById('myDataElement').getAttribute('data-django-variable');
  myData = JSON.parse(json_data);
  cnt_cpu_item = myData["cnt_cart_items"];
  
  drawCart();
  addCartItems();
  CalcTotal();
}
);

function drawCart(){
  let h1elem = document.getElementById('h1');
    
  let cart = document.createElement('div');
  cart.className = 'cart_page_back anim glass';
  cart.id = 'cart';

  // document.body.appendChild(cart);
  h1elem.insertAdjacentElement('afterend', cart);

}

function addCartItems() {
  for (let key in myData){
    if (key === 'cnt_cart_items') continue;
    
    let cartCont = document.getElementById("cart")
    let cartItem = document.createElement('div');
    cartItem.className = 'cart_content';
    cartItem.id = key;
    cartItem.innerHTML = `
      <div class="cart_part1">
                <p>${key}</p>
            </div>
            <div class="cart_part2">
                <div class="cart_part2_1">
                    <p>${myData[key].CostOne} ₽ </p>
                    <p class="cart_small_text">Цена за 1 шт</p>
                </div>
                <div class="cart_part2_2">
                    <div class="cart_part2_2_1">
                        <button name="${key}" onClick="CartItemMinus(this)">-</button>
                        <p>${myData[key].Count}</p>
                        <button name="${key}" onClick="CartItemPlus(this)">+</button>
                    </div>
                    <p class="cart_part2_2_2">шт</p>
                </div>
                <div class="cart_part2_3">
                    <p>${myData[key].CostAll} ₽ </p>
                    <button name="${key}" onClick="deleteCartItem(this)">X</button>
                </div>
            </div>
    `;

    cartCont.appendChild(cartItem);
    }
  
}

function CalcTotal(){
  let summ = 0;
  let TotalElem = document.getElementById("total");
  for (let key in myData){
    if (key === 'cnt_cart_items') continue;
    summ += myData[key].CostAll;
  }
  TotalElem.innerText = "Итоговая цена: " + summ.toString() + " ₽ ";
}

function deleteCartItem(CartElem){
  delete myData[CartElem.name];
  cartCont = document.getElementById(CartElem.name)
  cartCont.remove();
  cnt_cpu_item -= 1;
  CalcTotal();
}

function CartItemPlus(CartElem){
  cpuName = CartElem.name;
  myData[cpuName].Count += 1;
  myData[cpuName].CostAll += myData[cpuName].CostOne;
  CartElem.previousSibling.previousSibling.innerText = myData[cpuName].Count.toString();
  CalcTotal();
}

function CartItemMinus(CartElem){
  cpuName = CartElem.name;
  if (myData[cpuName].Count === 1){
    deleteCartItem(CartElem);
    CalcTotal();
    return
  }
  myData[cpuName].Count -= 1;
  myData[cpuName].CostAll -= myData[cpuName].CostOne;
  CartElem.nextElementSibling.innerText = myData[cpuName].Count.toString();
  CalcTotal();
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

    xhr.onload = function() 
    {
      if (xhr.status >= 200 && xhr.status < 300) 
      {
        let response = JSON.parse(xhr.responseText);
        if (response.success) 
        {
          console.log('Данные успешно добавлены');
        } 
        else 
        {
          alert('Произошла ошибка');
          console.error('Произошла ошибка:', response.errors);
        }
      } 
      else 
      {
        alert('Произошла ошибка при выполнении запроса.');
        console.error('Произошла ошибка при выполнении запроса.');
      }
    };

    xhr.onerror = function() 
    {
      alert('Произошла ошибка при выполнении запроса.');
      console.error('Произошла ошибка при выполнении запроса.');
    };

    xhr.send(JSON.stringify(data));

  }
);


let cnt_cpu_item;
let myData;

document.addEventListener("DOMContentLoaded", function() {
    let json_data = document.getElementById('myDataElement').getAttribute('data-django-variable');
    myData = JSON.parse(json_data);
    cnt_cpu_item = myData["cnt_cart_items"];
  });

function drawCart(){
    if (cnt_cpu_item === 0) {

    }
    else {
        
    }
}
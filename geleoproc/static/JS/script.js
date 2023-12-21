document.addEventListener("DOMContentLoaded", function() {
  filterFunction("input_1", "cpu_list_1");
  filterFunction("input_2", "cpu_list_2");
});

function filterFunction(id_inp, id_div) {
  let input, filter, div, p, i, txtValue;
  input = document.getElementById(id_inp);
  filter = input.value.toUpperCase();
  div = document.getElementById(id_div);
  p = div.getElementsByTagName("p");
  let visibleCounter = 0;
  
  for (i = 0; i < p.length; i++) {
    txtValue = p[i].textContent || p[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      if (visibleCounter < 5) {
        p[i].style.display = ""; // Показать элемент, если он соответствует поиску и количество видимых элементов меньше 5
        visibleCounter++;
      } else {
        p[i].style.display = "none"; // Скрыть элемент, если количество видимых элементов уже достигло 5
      }
    } else {
      p[i].style.display = "none"; // Скрыть элемент, если он не соответствует поиску
    }
  }
}

function insertText(element, inputId) {
  let selectedText = element.innerText;
  let firstParentId = element.parentElement.id; // ID первого родителя (родительский элемент <div>)
  document.getElementById(inputId).value = selectedText;

  filterFunction(inputId, firstParentId);
}

function choiceToggle(inputID){
  let choiceItems; 
  if (inputID === "input_1"){
    choiceItems = document.getElementById("cpu_list_1");
  }
  else{
    choiceItems = document.getElementById("cpu_list_2");
  }
  choiceItems.classList.toggle('hidden');
}

function choiceOpen(inputID){
  let choiceItems; 
  if (inputID === "input_1"){
    choiceItems = document.getElementById("cpu_list_1");
  }
  else{
    choiceItems = document.getElementById("cpu_list_2");
  }
  choiceItems.classList.remove('hidden');
}

document.addEventListener('click', function(e) {
  let input1 = document.getElementById("input_1");
  let input2 = document.getElementById("input_2");

  if (!input1.classList.contains("hidden")){
    let choiceItems = document.getElementById('cpu_list_1');
    if (!e.target.matches('#cpu_list_1, #input_1')) {
      choiceItems.classList.add('hidden');
    }  
  }

  if (!input2.classList.contains("hidden")){
    let choiceItems = document.getElementById('cpu_list_2');
    if (!e.target.matches('#cpu_list_2, #input_2')) {
      choiceItems.classList.add('hidden');
    }  
  }
});

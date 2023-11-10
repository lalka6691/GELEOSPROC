
function filterFunction(idinp, iddiv) {
  var input, filter, div, p, i, txtValue;
  input = document.getElementById(idinp);
  filter = input.value.toUpperCase();
  div = document.getElementById(iddiv);
  p = div.getElementsByTagName("p");
  var visibleCounter = 0;
  
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

function insertText(element) {
  var selectedText = element.innerText;
  var firstParentId = element.parentElement.id; // ID первого родителя (родительский элемент <div>)
  var secondParentId = element.parentElement.parentElement.id; // ID второго родителя (родительский элемент <div> этого <div>)
  var parentDiv = document.getElementById(secondParentId); // Получаем родительский div по его ID
  var inputId = parentDiv.querySelector('input').id; // Получаем ID input внутри div
  document.getElementById(inputId).value = selectedText;

  filterFunction(inputId, firstParentId);
}

function showDropdown(idinp, iddiv) {
  var dropdown = document.getElementById(iddiv);
  dropdown.style.display = 'block';
  filterFunction(idinp, iddiv);
}

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('myDropdown');
  var dropdown2 = document.getElementById('myDropdown2');
  if (!e.target.matches('.dropdown, .dropdown *')) {
    dropdown.style.display = 'none';
  }
  if (!e.target.matches('.dropdown2, .dropdown2 *')) {
    dropdown2.style.display = 'none';
  }
  
});
from django.http import HttpResponse
from django.shortcuts import render
from .models import CPU
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
 
# CPU.objects.all().delete()


'''
try:
    test = CPU.objects.get(name="Core i3-1115G4")    
except ObjectDoesNotExist:
    print("Объект не сушествует")
except MultipleObjectsReturned:
    print("Найдено более одного объекта")
'''

def index(request):
    # Сюда можно писать много всего и запихивать в дату
    data = {"CPUS": CPU.objects.all()} # Пихаем инфу из БД сюда
    return render(request, 'index.html', context=data) # В context подключаем дату

# пример обработки POST запроса 
def cpucomparison(request):
    # получаем из данных запроса POST отправленные через форму данные
    cpu1 = request.POST.get("cpu1")
    cpu2 = request.POST.get("cpu2")
    data = {"CPUS": CPU.objects.all(), "cpu1Name":cpu1, "cpu2Name":cpu2} # Пихаем инфу из БД сюда
    return render(request, 'comparsion.html', context=data) # В context подключаем дату
from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'test.html')

def addcpu(request):
    return HttpResponse("<h1>Добавление процессоров</h1>")

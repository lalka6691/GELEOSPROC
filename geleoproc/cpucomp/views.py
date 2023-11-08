from django.http import HttpResponse
from django.shortcuts import render
from .models import CPU
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.contrib.auth.models import User

def index(request):
    data = {"CPUS": CPU.objects.all()} 
    return render(request, 'index.html', context=data) 



def cpucomparison(request):
    cpu1 = request.POST.get("cpu1")
    cpu2 = request.POST.get("cpu2")
    data = {"CPUS": CPU.objects.all(), "cpu1Name":cpu1, "cpu2Name":cpu2}
    return render(request, 'comparsion.html', context=data) 



def home(request):
    data = {}
    return render(request, 'home.html', context=data) 



def register(request):
    if request.method == "GET":
        data = {}
        return render(request, 'register.html', context=data) 
    
    elif request.method == "POST":
        log = request.POST.get("login")
        pasw = request.POST.get("password")

        

        try:
            user1 = User.objects.get(username=log)
            data = {"user_exist":True}
            return render(request, 'register.html', context=data) 
        except ObjectDoesNotExist:
            user = User.objects.create_user(log, '', pasw)

        data = {}
        return render(request, 'home.html', context=data) 


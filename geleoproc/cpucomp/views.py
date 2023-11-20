import json
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .models import CPU, UserProfile
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.contrib.auth.models import User
from .signals import *

def index(request):
    data = {"CPUS": CPU.objects.all()} 
    return render(request, 'index.html', context=data) 



def cpucomparison(request):
    # Если заходить без логина, то крашится, надо починить!
    # Нужно добавить обработку того что выбран только один процессор
    n = 3
    if request.user.is_authenticated:
        # Получаем профиль пользователя
        user_profile = UserProfile.objects.get(user=request.user)
        n = user_profile.cart_data["cnt_cart_items"]
        


    
    cpu1 = request.POST.get("cpu1")
    cpu2 = request.POST.get("cpu2")
    

    try:
        cpu_model1 = CPU.objects.get(name=cpu1)
        cpu_model2 = CPU.objects.get(name=cpu2)
        
    except:
        data = {"CPUS": CPU.objects.all(), "cpu1Name":cpu1, "cpu2Name":cpu2, "valid_info":False,
                 "range":range(n), "cnt":n, 'cart_json':json.dumps(user_profile.cart_data)}
        
        return render(request, 'comparsion.html', context=data) 

    data = {"CPUS": CPU.objects.all(), "cpu1Name":cpu1, "cpu2Name":cpu2, "valid_info":True, 
            "cpu1cost":cpu_model1.cost, "cpu2cost":cpu_model2.cost, "range":range(n), "cnt":n,
              'cart_json':json.dumps(user_profile.cart_data)}
    
    return render(request, 'comparsion.html', context=data) 



def home(request):
    data = {"cnt":range(3)}
    return render(request, 'home.html', context=data) 



def register(request):
    if request.method == "GET":
        data = {}
        return render(request, 'register.html', context=data) 
    
    elif request.method == "POST":
        log = request.POST.get("login")
        pasw = request.POST.get("password")
        mail = request.POST.get("email")

        

        try:
            user1 = User.objects.get(username=log)
            data = {"user_exist":True}
            return render(request, 'register.html', context=data) 
        except ObjectDoesNotExist:
            user = User.objects.create_user(log, mail, pasw)

        data = {}
        return render(request, 'home.html', context=data) 

def WIP(request):
    data = {}
    return render(request, 'WIP.html', context=data) 
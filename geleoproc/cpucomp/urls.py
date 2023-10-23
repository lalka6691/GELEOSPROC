from django.urls import path
from cpucomp import views

from .views import *

urlpatterns = [
    path('', index),
    path('addcpu/', addcpu)
]
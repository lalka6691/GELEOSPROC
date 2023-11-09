from django.urls import path, include
from cpucomp import views

from .views import *

urlpatterns = [
    path('', home),
    path('cpucomparison/', cpucomparison),
    path('accounts/register/', register),
    path('accounts/', include('django.contrib.auth.urls')),
    path('WIP/', WIP)
]
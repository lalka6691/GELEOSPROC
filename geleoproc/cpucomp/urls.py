from django.urls import path, include
from cpucomp import views

from .views import *

urlpatterns = [
    path('', home),
    path('cpucomparison/', cpucomparison),
    path('accounts/register/', register),
    path('accounts/', include('django.contrib.auth.urls')),
    path('WIP/', WIP),
    path('cpucomp/', index),
    path('cart/', cart),
    path('ajax_post_cart/', ajax_post_cart, name='ajax_post_cart'),
]
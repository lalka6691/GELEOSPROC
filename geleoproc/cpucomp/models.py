from django.contrib.auth.models import User
from django.db import models
 
class CPU(models.Model):
    name = models.CharField(max_length=20)
    cost = models.IntegerField()
    cores = models.IntegerField()
    threads = models.IntegerField()
    base_freq = models.FloatField()
    max_freq = models.FloatField()
    max_temp = models.IntegerField()
    win11 = models.CharField(max_length=1)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    def default_cart_data():
        return {'cnt_cart_items': 0}

    cart_data = models.JSONField(default=default_cart_data)

    def __str__(self):
        return self.user.username

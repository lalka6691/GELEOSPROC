from django.db import models
 
class CPU(models.Model):
    name = models.CharField(max_length=20)
    testnumber = models.IntegerField()
    testtext = models.CharField(max_length=100)
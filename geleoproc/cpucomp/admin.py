from django.contrib import admin
from .models import CPU, UserProfile
# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'cart_data')
    
class CPU_display(admin.ModelAdmin):
    list_display = ('__str__',)

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(CPU, CPU_display)
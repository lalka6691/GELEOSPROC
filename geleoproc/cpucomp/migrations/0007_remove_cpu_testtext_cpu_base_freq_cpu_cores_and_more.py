# Generated by Django 4.2.7 on 2023-11-22 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cpucomp', '0006_alter_userprofile_cart_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cpu',
            name='testtext',
        ),
        migrations.AddField(
            model_name='cpu',
            name='base_freq',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cpu',
            name='cores',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cpu',
            name='max_freq',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cpu',
            name='max_temp',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cpu',
            name='threads',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cpu',
            name='win11',
            field=models.CharField(default=1, max_length=1),
            preserve_default=False,
        ),
    ]
# Generated by Django 2.2 on 2022-03-01 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JavaStepByStep', '0010_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(upload_to='JavaFile/'),
        ),
    ]

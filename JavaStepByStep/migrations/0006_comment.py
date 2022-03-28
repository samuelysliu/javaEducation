# Generated by Django 2.2 on 2022-02-06 08:29

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('JavaStepByStep', '0005_delete_comment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('commentator', models.CharField(max_length=50)),
                ('reviewed', models.CharField(max_length=50)),
                ('comment', models.TextField()),
                ('response', models.TextField(null=True)),
                ('comment_time', models.DateField(auto_now_add=True)),
            ],
        ),
    ]

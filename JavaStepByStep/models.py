from django.db import models
import uuid

# Create your models here.

class Comment(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    projectId = models.TextField(null=True)
    commentator = models.CharField(max_length=50)
    reviewed = models.CharField(max_length=50)
    comment = models.TextField()
    response = models.TextField(null=True)
    comment_time = models.DateField(auto_now_add=True)

class AssignComment(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    projectId = models.TextField()
    commentator = models.CharField(max_length=50)
    reviewed = models.CharField(max_length=50)
    commentatorScore = models.CharField(max_length=50, null=True)
    haveDone = models.CharField(max_length=50, null=True)
    assign_CreateTime = models.DateField(auto_now_add=True)

class Project(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    title = models.TextField(null=True)
    content = models.TextField(null=True)
    step1 = models.TextField(null=True)
    step2 = models.TextField(null=True)
    step3 = models.TextField(null=True)
    project_CreateTime = models.DateField(auto_now_add=True)


class File(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    projectId = models.TextField()
    owner = models.TextField()
    filePath = models.TextField()
    file_UploadTime = models.DateField(auto_now_add=True)

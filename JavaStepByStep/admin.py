from django.contrib import admin
from JavaStepByStep.models import Comment, Project, File, AssignComment

# Register your models here.
admin.site.register(Comment)
admin.site.register(Project)
admin.site.register(File)
admin.site.register(AssignComment)
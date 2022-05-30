"""JavaEducation URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from JavaStepByStep import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', views.register),
    path('api/login', obtain_jwt_token),
    path('api/userProfile', views.userProfile.as_view()),
    path('api/comment', views.CommentView.as_view()),
    path('api/javaFile', views.javaFile.as_view()),
    path('api/addProject', views.addProject.as_view()),
    path('api/deleteProject', views.deleteProject.as_view()),
    path('api/projectStudentList', views.projectStudentList.as_view()),
    path('api/studentWork', views.studentWork.as_view())
]

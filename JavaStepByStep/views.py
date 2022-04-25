from django.http import HttpResponse, QueryDict
from django.contrib.auth.models import User
from JavaStepByStep.serializers import commentSerializer, projectSerializer, fileSerializer, assignCommentSerializer
from JavaStepByStep.models import Comment, Project, File, AssignComment
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import os


# Create your views here.

# 註冊API
def register(request):
    if request.method == 'POST':
        account = request.POST['account']
        password = request.POST['password']
        authority = 0
        user = User.objects.filter(username=account).exists()  # 檢查此帳號是否存在
        if user:
            print("Has been register")
            return HttpResponse("Has been register")
        else:
            new_user = User.objects.create_user(username=account, password=str(password))
            new_user.save()
            return HttpResponse("success")

    return HttpResponse("must POST")


# 取得用戶資訊
class userProfile(APIView):
    authentication_classes = [JSONWebTokenAuthentication, ]  # Token的驗證
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        username = request.user.username
        teacher = request.user.is_staff
        return Response({'username': username, 'isTeacher': teacher})

    # 修改密碼
    def put(self, request, *args, **kwargs):
        if request.data['password'] != 'undefined':
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()

        data = {'message': 'success'}
        return Response(data)


# 新增題目API
class addProject(APIView):
    serializers = projectSerializer
    authentication_classes = [JSONWebTokenAuthentication, ]  # Token的驗證
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        projectId = request.GET['projectId']
        if projectId == "":  # 讀取所有題目
            data = Project.objects.all()
            if len(data) == 0:
                return HttpResponse('no data')
            else:
                serializer = []
                serializerTemp = self.serializers(data, many=True)
                serializer.append(serializerTemp.data)
            return Response(serializer)
        else:
            try:
                data = Project.objects.get(id=projectId)
            except Exception as e:
                data = {'error': str(e)}
                return Response(data)

            serializer = self.serializers(data)
            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            serializer = self.serializers(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            data = {'error': str(e)}

        data = {'message': 'success'}
        return Response(data)

    # 修改題目
    def put(self, request, *args, **kwargs):
        projectId = request.GET['projectId']
        data = request.data
        print(data)
        try:
            serializer = self.serializers(data=data)
            serializer.is_valid(raise_exception=True)
            data = serializer.data
        except Exception as e:
            data = {'error': str(e)}
            return Response(data)

        try:
            original = Project.objects.get(id=projectId)
            original.title = data['title']
            original.content = data['content']
            original.step1 = data['step1']
            original.step2 = data['step2']
            original.step3 = data['step3']
            original.save()

        except Exception as e:
            data = {'error': str(e)}
            return Response(data)

        response = {'message': 'success'}
        return Response(response)


# 留言功能API
class CommentView(APIView):
    serializers = commentSerializer  # 加載序列器
    authentication_classes = [JSONWebTokenAuthentication, ]  # Token的驗證
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        projectId = request.GET['projectId']
        reviewed = request.GET['reviewed']
        data = Comment.objects.filter(projectId=projectId, reviewed=reviewed)
        if len(data) == 0:
            return HttpResponse('no data')
        elif len(data) > 1:
            serializer = self.serializers(data, many=True)
        else:
            data = Comment.objects.get(projectId=projectId, reviewed=reviewed)
            serializer = self.serializers(data)
        return Response(serializer.data)
        # return Response({"status": "success", "data": serializer.validated_data}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            serializer = self.serializers(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            data = serializer.data
        except Exception as e:
            data = {'error': str(e)}
        data = {'message': 'success'}
        return Response(data)


# 讀Java檔API
class javaFile(APIView):
    serializers = fileSerializer  # 加載序列器
    authentication_classes = [JSONWebTokenAuthentication, ]  # Token的驗證
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        projectId = request.GET['projectId']
        owner = request.GET['reviewed']
        try:
            data = File.objects.get(projectId=projectId, owner=owner)
            serializer = self.serializers(data)
            filePath = serializer.data['filePath']

            f = open(filePath, "r")
            words = f.read()
            f.close()
        except Exception as e:
            data = {'error': 'does not exist'}
            return Response(data)

        return Response(words)

    def post(self, request, *args, **kwargs):
        data = request.FILES['file']
        filepath = 'JavaFile/' + request.data['owner'] + '/' + request.data['fileName']
        i = 0
        while os.path.isfile(filepath):
            filepath = filepath.split('.java')[0] + str(i) + '.java'
            i += 1

        path = default_storage.save(filepath, ContentFile(data.read()))
        os.path.join(settings.MEDIA_ROOT, path)

        data = QueryDict(
            'projectId=' + request.data['projectId'] + '&owner=' + request.data['owner'] + '&filePath=' + filepath)
        try:
            serializer = self.serializers(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except Exception as e:
            data = {'error': str(e)}
            return Response(data)

        data = {'message': 'success'}
        return Response(data)


# 取得已完成此作業的學生名單
class projectStudentList(APIView):
    serializers = fileSerializer  # 加載序列器
    authentication_classes = [JSONWebTokenAuthentication, ]  # Token的驗證
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        projectId = request.GET['projectId']
        try:
            data = File.objects.filter(projectId=projectId)
            serializer = self.serializers(data, many=True)
        except Exception as e:
            data = {'error': str(e)}
            return Response(data)

        return Response(serializer.data)


class studentWork(APIView):
    serializers = fileSerializer  # 加載序列器
    authentication_classes = [JSONWebTokenAuthentication, ]  # Token的驗證
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        owner = request.user.username
        try:
            data = File.objects.filter(owner=owner)
            if len(data) == 0:
                return HttpResponse('no data')
            elif len(data) > 1:
                serializer = self.serializers(data, many=True)
            else:
                data = File.objects.get(owner=owner)
                serializer = self.serializers(data)
            return Response(serializer.data)
        except Exception as e:
            data = {'error': str(e)}
            return Response(data)

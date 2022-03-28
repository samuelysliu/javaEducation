from JavaStepByStep.models import Comment, Project, File, AssignComment
from rest_framework import serializers

class projectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'content', 'step1', 'step2', 'step3',)
class commentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('projectId', 'commentator', 'reviewed', 'comment', 'response',)

class assignCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignComment
        fields = ('projectId', 'commentator', 'reviewed', 'commentatorScore', 'haveDone',)

class fileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('projectId', 'owner', 'filePath',)
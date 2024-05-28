# from rest_framework import serializers
# from .models import Project, Todo

# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = ['id', 'description', 'status', 'created_date', 'updated_date']

# class ProjectSerializer(serializers.ModelSerializer):
#     todos = TodoSerializer(many=True, read_only=True)

#     class Meta:
#         model = Project
#         fields = ['id', 'title', 'created_date', 'todos']


from rest_framework import serializers
from .models import Project, Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'description', 'status', 'created_date', 'updated_date']
        # read_only_fields = ['created_date', 'updated_date']

class ProjectSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)
    title = serializers.CharField(max_length=100)

    class Meta:
        model = Project
        fields = ['id','title', 'created_date', 'todos']
        # read_only_fields = ['created_date']


from rest_framework import serializers
from .models import Project

class ProjectTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['title']

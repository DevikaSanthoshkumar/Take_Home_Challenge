from django.shortcuts import render

# Create your views here.

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny  # Import AllowAny directly

@api_view(['POST'])
@permission_classes([AllowAny])  # Use AllowAny directly
def signup(request):
    print(request.data)
    form = UserCreationForm(data=request.data)
    if form.is_valid():
        user = form.save()
        return Response("Account created successfully", status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)




from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=HTTP_200_OK)




from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Todo
from .serializer import ProjectSerializer, TodoSerializer
from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Only allow authenticated users to create projects
def project_create(request):
    if request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)  # Associate the project with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# name edit and put


from rest_framework import status
from rest_framework.response import Response
from .models import Project
from .serializer import ProjectSerializer, ProjectTitleSerializer  # Import both serializers
from django.shortcuts import get_object_or_404

@api_view(['GET', 'PUT'])  # Allow both GET and PUT requests
@permission_classes([IsAuthenticated])
def project_edit(request, project_id):
    # Retrieve the project instance
    project = get_object_or_404(Project, pk=project_id)

    if request.method == 'GET':
        # Serialize only the project title for GET requests
        serializer = ProjectTitleSerializer(project)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# from rest_framework.permissions import AllowAny

# @api_view(['POST'])
# @permission_classes([AllowAny])  # Allow any user, authenticated or not, to create projects
# def project_create(request):
#     if request.method == 'POST':
#         serializer = ProjectSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(owner=request.user)  # Associate the project with the authenticated user
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def project_list(request):
    if request.method == 'GET':
        projects = Project.objects.filter(owner=request.user)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = request.data.copy()
        data['owner'] = request.user.id  # Set the owner to the authenticated user's ID
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# @api_view(['GET', 'POST'])
# def project_list(request):
#     if request.method == 'GET':
#         projects = Project.objects.all()
#         serializer = ProjectSerializer(projects, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = ProjectSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)

    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET', 'POST'])
# def todo_list(request, project_pk):
#     if request.method == 'GET':
#         todos = Todo.objects.filter(project__pk=project_pk)
#         serializer = TodoSerializer(todos, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = TodoSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(project_id=project_pk)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# from rest_framework.permissions import IsAuthenticated

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def todo_list(request, project_pk):
#     project = get_object_or_404(Project, pk=project_pk)
    
#     if request.method == 'GET':
#         todos = project.todos.all()  # Filter todos for the specific project
#         serializer = TodoSerializer(todos, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = TodoSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(project=project)  # Assign the project to the todo
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.permissions import IsAuthenticated
from .models import Todo
from .serializer import TodoSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def todo_list(request, project_pk):
    project = get_object_or_404(Project, pk=project_pk)
    todos = Todo.objects.filter(project=project)  # Define a queryset for the todos
    
    if request.method == 'GET':
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(project=project)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






@api_view(['GET', 'PUT', 'DELETE'])
def todo_detail(request, project_pk, todo_pk):
    todo = get_object_or_404(Todo, pk=todo_pk, project__pk=project_pk)

    if request.method == 'GET':
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    # Delete the token associated with the current user
    Token.objects.filter(user=request.user).delete()
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)







import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def export_project_summary_as_gist(request, project_id):
#     # Retrieve project data (replace this with your logic to fetch project data)
#     project = get_object_or_404(Project, pk=project_id)
    
#     # Filter todos based on their status
#     completed_todos = project.todos.filter(status=True).count()
#     total_todos = project.todos.count()
#     pending_todos = project.todos.filter(status=False).values('description')
#     completed_todos_list = project.todos.filter(status=True).values('description')

#     # Generate markdown content
#     markdown_content = generate_markdown(project.title, completed_todos, total_todos, pending_todos, completed_todos_list)

#     # Export markdown content as a secret gist
#     github_token = "<Your GitHub Token>"
#     filename = f"{project.title}.md"
#     gist_url = export_as_gist(markdown_content, filename, github_token)

#     return Response({"gist_url": gist_url})


import os
import requests
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Project

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def export_project_as_gist(request, project_id):
    # Get the project or return a 404 if not found
    project = get_object_or_404(Project, id=project_id)
    print(project.todos.all())
    # Get the todos that are pending or completed
    pending_todos = [todo for todo in project.todos.all() if not todo.status]
    completed_todos = [todo for todo in project.todos.all() if todo.status]
    print(pending_todos)
    print(completed_todos)

    gist_content = (
        "# " + project.title + "\n\n"
        "*Summary*: " + str(len(completed_todos)) + " / " + str(project.todos.count()) + " completed\n\n"
        "## Pending Todos\n" +
        ''.join([f"- [ ] {todo.description}\n" for todo in pending_todos]) +
        "\n## Completed Todos\n" +
        ''.join([f"- [x] {todo.description}\n" for todo in completed_todos])
    )

    # Set up the headers with the GitHub token from environment variables
    github_token = os.getenv('GITHUB_TOKEN')
    
    if not github_token:
        return JsonResponse({'message': 'GitHub token is missing'}, status=400)

    headers = {
        'Authorization': f'Bearer {github_token}',
        'Content-Type': 'application/json',
    }

    # Create the gist on GitHub
    gist_data = {
        'description': f"{project.title} summary",
        'public': False,
        'files': {
            f"{project.title.replace(' ', '_')}.md": {  # Replace spaces with underscores in the filename
                'content': gist_content,
            },
        },
    }

    try:
        response = requests.post(
            'https://api.github.com/gists',
            json=gist_data,
            headers=headers,
        )

        response.raise_for_status()  # Raise exception for HTTP errors

        # Return the gist URL
        return JsonResponse({'gistUrl': response.json().get('html_url')})

    except requests.exceptions.RequestException as e:
        # Handle errors related to the HTTP request
        return JsonResponse({'message': 'Error creating Gist', 'error': str(e)}, status=500)

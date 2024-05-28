from django.urls import path
from challenge import views
urlpatterns = [
   
    path('signup',views.signup,name='signup_api'),
    path('login', views.login, name='login_api'),
    # Project 
    path('createprojects/', views.project_create, name='project-create'),
    path('projects/', views.project_list, name='project-list'),
    path('projects/<int:pk>/', views.project_detail, name='project-detail'),
    path('projects/<int:project_id>/edit/', views.project_edit, name='project-edit'),
    
    # Todo URLs
    path('projects/<int:project_pk>/todos/',views.todo_list, name='todo-lists'),
    path('projects/<int:project_pk>/todos/add', views.todo_list, name='todo-list'),
    # path('projects/<int:project_pk>/todos/<int:todo_pk>/', views.todo_detail, name='todo-detail'),
    
    # Todo Actions URLs
    # path('projects/<int:project_pk>/todos/add/', views.todo_detail, name='todo-add'),
    path('projects/<int:project_pk>/todos/<int:todo_pk>/update/', views.todo_detail, name='todo-update'),
    path('projects/<int:project_pk>/todos/<int:todo_pk>/remove/', views.todo_detail, name='todo-remove'),
    path('logout/', views.logout, name='logout'),
    path('projects/<int:project_id>/export-gist/', views.export_project_as_gist, name='export_project_as_gist'),
]



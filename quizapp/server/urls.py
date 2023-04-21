from django.urls import path
from server import views

# from .views import RegisterAPI, LoginAPI

urlpatterns = [
        # path('students', views.student_list),
        path('signup/', views.signup, name='signup'),
        path('login/', views.login, name='login'),
        path('questions', views.question_list),
        path('subjects', views.subject_list),
        path('students', views.student_list),
        path('results', views.result_list),
        path('subjects/<int:pk>/', views.subject_detail),
        path('subjectdata/<int:pk>/', views.subject_data),
        path('results/<int:pk>/', views.result_detail),
        path('students/<int:pk>/', views.student_detail),
        path('questions/<int:pk>/', views.question_detail),
        
]

from django.urls import include, path
from . import views

urlpatterns = [
    path('api/', views.getRoutes, name='routes'),
]
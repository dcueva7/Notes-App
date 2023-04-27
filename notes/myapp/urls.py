from django.urls import include, path
from . import views

urlpatterns = [
    path('notes/', views.getNotes.as_view(), name="notes"),
    path('notes/<pk>', views.getSingleNote.as_view(), name="single_note"),
    path('update/<pk>', views.updateNote.as_view(), name='update_note'),
    path('add/', views.addNote.as_view(), name='add_note'),

]
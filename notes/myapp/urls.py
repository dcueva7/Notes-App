from django.urls import include, path
from . import views

urlpatterns = [
    path('notes/', views.getNotes.as_view(), name="notes"),
    path('notes/<pk>', views.getSingleNote.as_view(), name="single_note"),
    path('notes/update/<pk>', views.updateNote.as_view(), name='update_note'),
    path('notes/add/', views.addNote.as_view(), name='add_note'),

]
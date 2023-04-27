from django.shortcuts import render

from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView
from .serializers import NoteSerializer

from .models import Note
# Create your views here.

class getNotes(ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class getSingleNote(RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class updateNote(UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class addNote(CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
















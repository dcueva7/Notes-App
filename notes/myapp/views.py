from django.shortcuts import render

from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import NoteSerializer

from .models import Note
# Create your views here.

class getNotes(ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class getSingleNote(RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer












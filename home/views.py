from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render
import requests
# Create your views here.

def home(request):
    return render(request, 'html/index.html')


def gallery(request):
    return render(request, 'html/gallery.html')



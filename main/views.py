from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
	return render(request, 'index.html')

def country(request, country_name):
	return render(request, 'country.html', {'country': country_name})


#  talhaquddoos1@gmail.com
# twitter.com/TalhaQuddoosPK
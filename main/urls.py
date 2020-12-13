from django.urls import path

from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('country/<str:country_name>', views.country)
]	
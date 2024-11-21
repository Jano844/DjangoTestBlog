from django.urls import path
from . import views


urlpatterns = [
	path('', views.show_all_chats, name='chat'),
	path('<int:room_id>/', views.room_detail, name='room_detail'),
	path('<int:room_id>/add/', views.add_users, name='add-users'),
	# path('<int:room_id>/add/', views.add_users, name='add-users')
]

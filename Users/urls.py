from django.urls import path
from .views import login_view, Get_User,logout_view

urlpatterns = [
    path('login/', login_view, name='login'),  # Define a URL pattern for the login view
    path('Get_user/', Get_User, name='Get_User'),
    path('logout/', logout_view, name='logout'),
]
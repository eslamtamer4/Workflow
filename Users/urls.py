from django.urls import path
from .views import login_view, Get_User

urlpatterns = [
    path('login/', login_view, name='login'),  # Define a URL pattern for the login view
    path('Get_user/', Get_User, name='Get_User'),
]
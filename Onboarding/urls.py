from django.urls import path
from . import views

urlpatterns = [
    path('Fetch_Positions/', views.get_positions, name='Fetch_Positions'),
    path('Post_Onboarding_Form/', views.create_onboarding_request, name='Post_Onboarding_Form')
]
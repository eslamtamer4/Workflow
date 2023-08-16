from django.urls import path
from . import views

urlpatterns = [
    path('Fetch_Positions/', views.get_positions, name='Fetch_Positions'),
    path('Post_Onboarding_Form/', views.create_onboarding_request, name='Post_Onboarding_Form'),
    path('Get_Onboarding_requests/', views.Get_Onboarding_requests, name='Get_Onboarding_requests'),
    path('Get_Employee_List/', views.get_employee_list, name='get_employee_list'),
]
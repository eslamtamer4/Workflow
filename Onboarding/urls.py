from django.urls import path
from . import views

urlpatterns = [
    path('Fetch_Positions/', views.get_positions, name='Fetch_Positions'),
    path('Post_Onboarding_Form/', views.create_onboarding_request, name='Post_Onboarding_Form'),
    path('Get_Onboarding_requests/', views.Get_Onboarding_requests, name='Get_Onboarding_requests'),
    path('Get_Onboarding_requests_Sup/', views.Get_Onboarding_requests_Sup, name='Get_Onboarding_requests_Sup'),
    path('Get_Employee_List/', views.get_employee_list, name='get_employee_list'),
    path('Update_Onboarding_request/<int:request_id>/', views.update_onboarding_request, name='update_onboarding_request'),
    path('Update_Onboarding_request_sup/<int:request_id>/', views.update_onboarding_request_sup, name='update_onboarding_request_sup'),

]
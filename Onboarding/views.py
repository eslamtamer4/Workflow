from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from .models import On_Boarding_Request, Position, Experience
from Users.models import User
from django.db.models import Q

@api_view(['GET'])
def get_positions(request):
    positions = Position.objects.all()
    position_list = [{'id': position.id, 'title': position.title} for position in positions]
    return Response(position_list)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from .models import On_Boarding_Request, Position, Experience
from django.db.models import Q

@api_view(['GET'])
def get_employee_list(request):
    employees = User.objects.all()  # You might need to adjust this query based on your User model structure
    employee_list = [{'id': employee.ID, 'name': employee.username} for employee in employees]
    return JsonResponse(employee_list, safe=False)

@api_view(['POST'])
def create_onboarding_request(request):
    if request.method == 'POST':
        data = request.data
        print(data)

        position_applying_for_id = data.get('position_applying_for')
        position_applying_for = Position.objects.get(id=position_applying_for_id)
                
        onboarding_request = On_Boarding_Request(
            name=data.get('name'),
            address=data.get('address'),
            application_date=data.get('application_date'),
            date_of_birth=data.get('date_of_birth'),
            place_of_birth=data.get('place_of_birth'),
            gender=data.get('gender'),
            military_service=data.get('military_service'),
            father_occupation=data.get('father_occupation'),
            marital_status=data.get('marital_status'),
            num_of_kids=data.get('num_of_kids'),
            spouse_occupation=data.get('spouse_occupation'),
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            position_applying_for=position_applying_for,
            current_employer_benefits=data.get('current_employer_benefits'),
            education=data.get('education'),
            references=data.get('references'),
            referred_by=data.get('referred_by'),
            expected_salary=data.get('expected_salary'),
            notice_period=data.get('notice_period'),
        )
        onboarding_request.save()

        job_experience_data = data.get('job_experience')
        for experience_data in job_experience_data:
            experience = Experience(
                onboarding_request=onboarding_request,
                from_date=experience_data['from_date'],
                to_date=experience_data['to_date'],
                employer=experience_data['employer'],
                title=experience_data['title'],
                gross_salary=experience_data['gross_salary'],
                leave_reason=experience_data['leave_reason'],
            )
            experience.save()

        return Response({'message': 'Onboarding request created successfully'}) 

    return Response({'error': 'Invalid request method'}, status=405)


@api_view(['GET'])
def Get_Onboarding_requests(request):
    if request.method == 'GET':
        onboarding_requests = On_Boarding_Request.objects.all()
        
        requests_data = []
        for request in onboarding_requests:
            request_data = {
                'id': request.id,
                'name': request.name,
                'address': request.address,
                'application_date': request.application_date,
                'date_of_birth': request.date_of_birth,
                'place_of_birth': request.place_of_birth,
                'gender': request.gender,
                'military_service': request.military_service,
                'father_occupation': request.father_occupation,
                'marital_status': request.marital_status,
                'num_of_kids': request.num_of_kids,
                'spouse_occupation': request.spouse_occupation,
                'phone_number': request.phone_number,
                'email': request.email,
                'position_applying_for': request.position_applying_for.title,
                'current_employer_benefits': request.current_employer_benefits,
                'education': request.education,
                'references': request.references,
                'referred_by': request.referred_by,
                'expected_salary': request.expected_salary,
                'notice_period': request.notice_period,
                'Assigned_to': request.Assigned_to.username if request.Assigned_to else None,
                'HR_comment': request.HR_comment,
                'Technical_comment': request.Technical_comment,
                'Status': request.Status,
                'experiences': [],
            }
            for experience in request.experiences.all():
                experience_data = {
                    'from_date': experience.from_date,
                    'to_date': experience.to_date,
                    'employer': experience.employer,
                    'title': experience.title,
                    'gross_salary': experience.gross_salary,
                    'leave_reason': experience.leave_reason,
                }
                request_data['experiences'].append(experience_data)
            
            requests_data.append(request_data)
        
        return Response(requests_data)

    return Response({'error': 'Invalid request method'}, status=405)



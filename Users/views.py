from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.tokens import default_token_generator
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.models import Token
from .models import User 
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = User.objects.get(E_mail=email)  # Fetch user using email
        username = user.username  # Get the corresponding username
    except User.DoesNotExist:
        user = None
        username = None

    if user is not None:
        user = authenticate(request, username=username, password=password)
        login(request, user)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            print(access_token)
            return Response({"token": access_token})
        else:
            return Response({"error"}, status=400)
    else:
        return Response({"error": "User does not exist"}, status=400)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logged out successfully"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Get_User(request):
    user = request.user
    print(request.user)
    user_data = {
        "id": user.id,
        "Username":user.username,
        "Firstname": user.Firstname,
        "Lastname": user.Lastname,
        "E_mail": user.E_mail,
        "Is_active": user.Is_active,
        "Created_date": user.Created_date,
        "Modified_date": user.Modified_date,
        "Is_HR": user.Is_HR,
    }
    return Response(user_data)
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import User 
from django.contrib.auth import authenticate
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
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            # print(token)
            return Response({"token": token.key})
        else:
            return Response({"error": "Wrong password"}, status=400)
    else:
        return Response({"error": "User does not exist"}, status=400)


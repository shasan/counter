from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.shortcuts import render
from .models import Survey
from .serializers import *
from django.db.models import Count, Case, When

# For getting the list of all surveys
@api_view(['GET', 'POST'])
def survey_list(request):
    if request.method == 'GET':
        data = Survey.objects.all()

        serializer = SurveySerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# TODO: Create the stats endpoints for offering the CSV dumps
@api_view(['GET'])
def stats(request):
    #Get our four data sets
    spotify_data = Survey.objects.all().aggregate(spotify_customer=Count(Case(When(spotify_customer=True, then=1)))).get('spotify_customer')
    google_data = Survey.objects.all().aggregate(google_music_customer=Count(Case(When(google_music_customer=True, then=1)))).get("google_music_customer")
    pandora_data = Survey.objects.all().aggregate(pandora_customer=Count(Case(When(pandora_customer=True, then=1)))).get("pandora_customer")
    other_data = Survey.objects.all().aggregate(other_customer=Count(Case(When(other_customer=True, then=1)))).get("other_customer")

    #put our collected data into a map for serializing and whatnot
    returnedData = {
        "spotify":spotify_data,
        "google":google_data,
        "pandora":pandora_data,
        "other":other_data
    }
    
    #return our serialized data
    return Response(returnedData)

def singleLineExport(request):
    pass

def multiLineExport(request):
    pass


# For updating a survey (or deleting one altogether, which isn't really needed)
@api_view(['PUT', 'DELETE'])
def survey_detail(request, pk):
    try:
        survey = Survey.objects.get(pk=pk)
    except Survey.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = SurveySerializer(survey, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        survey.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
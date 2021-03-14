from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.shortcuts import render
from .models import Survey
from .serializers import *
from django.db.models import Count, Case, When
import csv
from django.http import HttpResponse


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

def getCounts():
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
    return returnedData

@api_view(['GET'])
def stats(request):
    data = getCounts()
    #return our serialized data
    return Response(data)

#collect a set of values to export as a single line CSV
def singleLineExport(request):
    # total submission count
    numSubmissions = Survey.objects.all().count()
    # total counts for each source
    counts = getCounts()
    spotify_count = counts.get("spotify")
    google_count = counts.get("google")
    pandora_count = counts.get("pandora")
    other_count = counts.get("other")
    
    # percentage of clicks for each source
    percent_spotify = spotify_count / numSubmissions
    percent_google = google_count / numSubmissions
    percent_pandora = pandora_count / numSubmissions
    percent_other = other_count / numSubmissions
    #generate our csv output
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="somefilename.csv"'
    writer = csv.writer(response)
    writer.writerow([numSubmissions, spotify_count, google_count, pandora_count, other_count, percent_spotify, percent_google, percent_pandora, percent_other])
    return response
    
#collect all data for a multiline csv export
def multiLineExport(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="somefilename.csv"'
    writer = csv.writer(response)
    #output the first row (headers)
    writer.writerow(['First Name', 'Last Name', 'Email', 'Spotify', 'Google', 'Pandora', 'Other'])
    #collect all the remaining data and loop through/write
    data = Survey.objects.all()
    output=[]
    for entry in data:
        output.append([entry.first_name, entry.last_name, entry.email, entry.spotify_customer, entry.google_music_customer, entry.pandora_customer, entry.other_customer])

    writer.writerows(output)
    return response
    
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
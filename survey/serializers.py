from rest_framework import serializers
from survey.models import Survey

class SurveySerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey 
        fields = ('pk', 'first_name', 'last_name','email', 'spotify_customer', 'google_music_customer', 'pandora_customer', 'other_customer')
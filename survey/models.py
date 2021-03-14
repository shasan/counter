from django.db import models

class Survey(models.Model):
    first_name = models.CharField("FirstName", max_length=50)
    last_name = models.CharField("LastName", max_length=50)
    email = models.EmailField()
    spotify_customer = models.BooleanField(default=False)
    google_music_customer = models.BooleanField(default=False)
    pandora_customer = models.BooleanField(default=False)
    other_customer = models.BooleanField(default=False)


    def __str__(self):
        return self.name
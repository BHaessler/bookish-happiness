from django.db import models

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=255)
    biography = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)
    description = models.TextField(blank=True)
    genre = models.CharField(max_length=100, blank=True)

    
    def __str__(self):
        return self.title
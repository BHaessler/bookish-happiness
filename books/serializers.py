from rest_framework import serializers
from .models import Author, Book

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'biography']

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Author name is required.")
        return value

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()  # Nested serializer for author

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'genre']
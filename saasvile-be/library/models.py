from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()

class Reservation(models.Model):
    book_id = models.ForeignKey('Book', on_delete=models.CASCADE)
    reserved_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
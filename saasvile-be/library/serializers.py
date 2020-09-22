from rest_framework import serializers

from library.models import Book, Reservation

class BookSerializer(serializers.ModelSerializer):
    reserved = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            'id',
            'name',
            'author',
            'quantity',
            'reserved',
        ]

    def get_reserved(self, book):
        return Reservation.objects.filter(book_id=book.id).count()

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'id',
            'book_id',
            'reserved_by',
            'created_at',
        ]
        read_only_fields = [
            'created_at',
        ]

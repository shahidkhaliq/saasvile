from django.http import (
    Http404, HttpResponseBadRequest
)
from django.shortcuts import render
from rest_framework import (
    generics,
    response,
    status,
    viewsets,
)

from library.models import Book, Reservation
from library.serializers import (
    BookSerializer, ReservationSerializer
)


class BookListAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def list(self, request, *args, **kwargs):
        books = (
            Book.objects.filter(
                name__contains=request.query_params['query']
            )
            if 'query' in request.query_params else
            self.get_queryset()
        )
        return response.Response(
            self.serializer_class(books, many=True).data
        )


class BookDetailAPIView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


# TODO: Should not allow reserving more books than available
class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
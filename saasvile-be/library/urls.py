from django.urls import path
from rest_framework.routers import DefaultRouter

from library.views import (
    BookDetailAPIView,
    BookListAPIView,
    ReservationViewSet,
)

router = DefaultRouter()
router.register(
    r'reservations', ReservationViewSet, basename='reservation'
)

urlpatterns = [
    path('books/', BookListAPIView.as_view(), name='book-list'),
    path(
        'books/<int:pk>/', 
        BookDetailAPIView.as_view(), 
        name='book-detail',
    )
] + router.urls
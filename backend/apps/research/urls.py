from django.urls import path
from .views import health, query_research

urlpatterns = [
    path("health/", health),
    path("query/", query_research),
]

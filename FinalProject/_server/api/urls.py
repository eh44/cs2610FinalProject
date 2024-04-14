from django.urls import path
from . import views

urlpatterns = [
    path('best_score/', view=views.best_score, name='score'),
    path('get_profile/', view=views.get_profile, name="profile")
]

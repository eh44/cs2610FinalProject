from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from core.models import Profile
from django.forms import model_to_dict
from django.db.models import Max
from django.core.exceptions import ObjectDoesNotExist
import json


def best_score(req):
    if req.method == "POST":
        body = json.loads(req.body)
        score = body['score']
        if req.user != None:
            profile = Profile.objects.get(user = req.user)
            if profile.score < score:
                profile.score = score
                profile.save()
        return JsonResponse({'message': 'Best score updated successfully'})

    else:   
            profiles = Profile.objects.all()
            best_score = profiles.aggregate(max_score=Max('score'))['max_score'] or 0
            return JsonResponse({'score': best_score})


@login_required
def get_profile(req):
    profile = Profile.objects.get(user = req.user)
    profile = model_to_dict(profile)
    return JsonResponse({ "profile":profile})

            
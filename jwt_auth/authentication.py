from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings #Secret key in project/settings
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):

  def authenticate(self, request):
    print('Authenticate middleware ---->')
    header = request.headers.get('Authorization')
    if not header:
      return None

    if not header.startswith('Bearer'):
      print('Failed at token syntax')
      raise PermissionDenied('Invalid Token')


    token = header.replace('Bearer ', '')

    try:
      payload = jwt.decode(token, settings.SECRET_KEY, ['HS256'])
      user = User.objects.get(pk=payload.get('sub'))
    except jwt.exceptions.InvalidTokenError:
      print('Failed at token decode')
      raise PermissionDenied('Invalid Token')

    except User.DoesNotExist:
      print('Failed at the user lookup')
      raise PermissionDenied('User not found')

    return (user, token)
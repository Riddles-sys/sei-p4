from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from rest_framework.exceptions import ValidationError 
from django.contrib.auth.hashers import make_password

# import django.contrib.auth.password_validation as validators

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

  
# Stops passwords being revealed
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

      password = data.pop('password')
      password_confirmation = data.pop('password_confirmation')

      if password != password_confirmation:
        raise ValidationError({
          'password_confirmation': 'Passwords do not match'
        })

      
      password_validation.validate_password(password)

      data['password'] = make_password(password)
    
      return data

    class Meta:
      model = User
      fields = ('id', 'first_name', 'username', 'email', 'profile_image', 'password', 'password_confirmation', 'bio')

    
class ChangePasswordSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True, required=True) #may need to add validate password
  password_confirmation = serializers.CharField(write_only=True, required=True)
  old_password = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = User
    fields = ('old_password', 'password', 'password_confirmation')

    def validate(self, request, attrs):
      if request.method == 'POST':

        if attrs['password'] != attrs['password_confirmation']:
          raise serializers.ValidationError({'password': 'Passwords do not match'})

    def validate_old_password(self, value):
      user = self.context['request'].user
      if not user.check_password(value):
        raise serializers.ValidationError({'old_password': 'Old password is incorrect'})
      return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()

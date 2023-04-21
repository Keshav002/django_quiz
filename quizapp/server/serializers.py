from rest_framework import serializers
from server.models import Student
from server.models import Question
from server.models import Result
from server.models import Subject
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone

class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = Student.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = Student
        fields = ('id','email', 'username','role', 'password')


# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def validate(self, data):
#         email = data.get("email", None)
#         password = data.get("password", None)
#         if not email:
#             raise serializers.ValidationError("Email address is required")
#         if not password:
#             raise serializers.ValidationError("Password is required")

#         user = Student.objects.filter(email=email).first()
#         if user is None:
#             raise serializers.ValidationError("User does not exist")
#         if not user.check_password(password):
#             raise serializers.ValidationError("Incorrect password")

#         refresh = RefreshToken.for_user(user)
#         return {
#             'email': user.email,
#             'username': user.username,
#         }


class ResultSerializer(serializers.ModelSerializer):
    attempted_on = serializers.DateTimeField(read_only=True, default=timezone.now)
    email = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())
    email_name = serializers.StringRelatedField(source='email.email', read_only=True)
    subject_name = serializers.StringRelatedField(source='subject.subject_name', read_only=True)
    # email_id = serializers.CharField(source = 'email.email', read_only=True)
    # subjectx = serializers.CharField(source = 'subject.subject_name', read_only=True)
    
    class Meta:
        model = Result
        fields = ['id', 'email', 'subject','subject_name','email_name', 'marks', 'attempted_on']

class QuestionSerializer(serializers.ModelSerializer):
    subject_name = serializers.StringRelatedField(source='subject.subject_name', read_only=True)
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())

    class Meta:
        model = Question
        fields = ['id', 'subject','subject_name', 'que', 'option1', 'option2', 'option3', 'option4', 'correctoption']

class SubjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Subject
        fields = ['id', 'subject_name', 'subject_description']


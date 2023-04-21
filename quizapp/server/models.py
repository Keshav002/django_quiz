from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone
import datetime
class StudentManager(BaseUserManager):
    def create_user(self, email, username, role, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")
        if not role:
            raise ValueError("Users must have a role")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            role=role,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, role, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            role=role,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class Student(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    role = models.CharField(max_length=30, default="student")
    date_joined = models.DateTimeField(verbose_name="date joined", default=datetime.datetime.now())
    last_login = models.DateTimeField(verbose_name="last login", default=datetime.datetime.now())
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "role"]

    objects = StudentManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Subject(models.Model):
    subject_name = models.CharField(max_length=200, unique=True)
    subject_description = models.TextField(max_length=200)
    def __str__(self):
        return self.subject_name


class Result(models.Model):
    email = models.ForeignKey(Student, on_delete=models.CASCADE, default=1)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    marks = models.IntegerField()
    attempted_on = models.DateTimeField(default=datetime.datetime.now)
    def __str__(self):
        return f"{self.email.email}"

class Question(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    que = models.TextField()
    option1 = models.CharField(max_length=50)
    option2 = models.CharField(max_length=50)
    option3 = models.CharField(max_length=50)
    option4 = models.CharField(max_length=50)
    correctoption = models.CharField(max_length=50)
    def __str__(self):
        return self.que
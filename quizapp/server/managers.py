# from django.contrib.auth.base_user import BaseUserManager
# from django.utils.translation import gettext as _

# class CustomUserManager(BaseUserManager):
#     """
#     Custom user model manager where email is the unique identifier
#     for authentication instead of usernames.
#     """

#     def create_user(self, username, email, role, password=None):
#         if not email:
#             raise ValueError(_('Users must have an email address'))
        
#         user = self.model(
#             username=username,
#             email=self.normalize_email(email),
#             role = role,
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, username, email, role, password):
#         user = self.create_user(
#             username=username,
#             email=self.normalize_email(email),
#             role = role,
#             password = password
#         )

#         user.is_admin = True
#         user.is_staff = True
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user
from django.contrib import admin
from .models import Employees
from django.contrib.auth.admin import UserAdmin
from .models import User
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in




class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = '__all__'
        field_classes = None


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('E_mail', 'username')


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    fieldsets = (
        (None, {'fields': ('E_mail', 'username', 'password')}),
        ('Personal Info', {'fields': ('Firstname', 'Lastname')}),
        ('Permissions', {'fields': ('is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'Created_date')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('E_mail', 'username', 'password1', 'password2'),
        }),
    )


@receiver(user_logged_in)
def update_last_login(sender, request, user, **kwargs):
    user.save()

@admin.register(Employees)
class EmployeesAdmin(admin.ModelAdmin):
    list_display = ('Manager', 'Employee', 'Relationship_description')
    list_filter = ('Manager', 'Employee')
    search_fields = ('Manager__username', 'Employee__username', 'Relationship_description')



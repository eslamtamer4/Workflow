from django.contrib import admin
from .models import Position, Experience, On_Boarding_Request

@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)  # Define search fields for autocomplete reference

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'employer', 'from_date', 'to_date', 'onboarding_request_name')
    search_fields = ('title', 'employer')

    def onboarding_request_name(self, obj):
        return obj.onboarding_request.name if obj.onboarding_request else None

    onboarding_request_name.short_description = 'On-Boarding Request Employee Name'

class ExperienceInline(admin.TabularInline):  # Displaying Experiences as inline within OnBoardingRequestAdmin
    model = Experience
    extra = 1  # Number of empty experience forms to show

@admin.register(On_Boarding_Request)
class OnBoardingRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'application_date', 'position_applying_for')

    list_filter = ('position_applying_for', 'gender', 'marital_status')

    search_fields = ('name', 'email')

    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'address', 'application_date', 'date_of_birth', 'place_of_birth', 'gender', 'military_service',
                       'father_occupation', 'marital_status', 'num_of_kids', 'spouse_occupation')
        }),
        ('Contact Information', {
            'fields': ('phone_number', 'email')
        }),
        ('Job Application', {
            'fields': ('position_applying_for',)  # Remove 'job_experience' here
        }),
        ('Other Information', {
            'fields': ('current_employer_benefits', 'education', 'references', 'referred_by', 'expected_salary', 'notice_period')
        }),
    )

    inlines = [ExperienceInline]  # Add the ExperienceInline inline admin for job_experience

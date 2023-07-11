from django.contrib import admin

from django.contrib import admin
from .models import Request

@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ('ID', 'Submitter', 'Receiver', 'Status')
    list_filter = ('Status',)
    search_fields = ('Submitter__username', 'Receiver__username', 'Status')


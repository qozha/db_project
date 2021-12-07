from django.contrib import admin
from apis.models import Discover, Disease, Country, Doctor, Publicservant, Record

# Register your models here.

admin.site.register(Disease)
admin.site.register(Country)
admin.site.register(Discover)
admin.site.register(Doctor)
admin.site.register(Publicservant)
admin.site.register(Record)
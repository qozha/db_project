# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.db.models.fields import DateTimeField
from django.db.models import UniqueConstraint
import datetime


class Country(models.Model):
    cname = models.CharField(primary_key=True, max_length=50)
    population = models.BigIntegerField(blank=True, null=True)

    class Meta:
        db_table = 'country'


class Discover(models.Model):
    cname = models.OneToOneField(Country, models.DO_NOTHING, db_column='cname', primary_key=True)
    disease_code = models.ForeignKey('Disease', models.DO_NOTHING, db_column='disease_code')
    first_enc_date = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'discover'
        unique_together = (('cname', 'disease_code'),)


class Disease(models.Model):
    disease_code = models.CharField(primary_key=True, max_length=50)
    pathogen = models.CharField(max_length=20, blank=True, null=True)
    description = models.CharField(max_length=140, blank=True, null=True)
    id = models.ForeignKey('Diseasetype', models.DO_NOTHING, db_column='id', blank=True, null=True)

    class Meta:
        db_table = 'disease'


class Diseasetype(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=140, blank=True, null=True)

    class Meta:
        db_table = 'diseasetype'


class Doctor(models.Model):
    email = models.OneToOneField('Users', models.DO_NOTHING, db_column='email', primary_key=True)
    degree = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'doctor'


class Publicservant(models.Model):
    email = models.OneToOneField('Users', models.DO_NOTHING, db_column='email', primary_key=True)
    department = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'publicservant'


class Record(models.Model):
    email = models.OneToOneField(Publicservant, models.DO_NOTHING, db_column='email', primary_key=True)
    cname = models.ForeignKey(Country, models.DO_NOTHING, db_column='cname')
    disease_code = models.ForeignKey(Disease, models.DO_NOTHING, db_column='disease_code')
    total_deaths = models.IntegerField(blank=True, null=True)
    total_patients = models.IntegerField(blank=True, null=True)
    date_added = models.DateTimeField(default=datetime.datetime.now)

    class Meta:
        db_table = 'record'
        UniqueConstraint(fields = ['email', 'disease_code', 'date_added'], name = 'constraint_name')


class Specialize(models.Model):
    id = models.OneToOneField(Diseasetype, models.DO_NOTHING, db_column='id', primary_key=True)
    email = models.ForeignKey(Doctor, models.DO_NOTHING, db_column='email')

    class Meta:
        db_table = 'specialize'
        unique_together = (('id', 'email'),)


class Users(models.Model):
    email = models.CharField(primary_key=True, max_length=60)
    name = models.CharField(max_length=30, blank=True, null=True)
    surname = models.CharField(max_length=40, blank=True, null=True)
    salary = models.IntegerField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    cname = models.ForeignKey(Country, models.DO_NOTHING, db_column='cname', blank=True, null=True)
    password = models.CharField(max_length=20, null=False, blank=False, default='password')

    class Meta:
        db_table = 'users'

class Admin(models.Model):
    email = models.OneToOneField(Users, models.DO_NOTHING, db_column='email', primary_key=True)
    password = models.CharField(max_length=20, null=False, blank=False, default='password')
    department = models.CharField(max_length=20, null=False, blank=False, default='Dep1')

    class Meta:
        db_table = 'admin'
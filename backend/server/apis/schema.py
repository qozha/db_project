import graphene
from graphene_django import DjangoObjectType
from apis.models import Country, Disease, Admin, Doctor, Publicservant, Record, Specialize, Users
import datetime


class DoctorType(DjangoObjectType):
    class Meta:
        model = Doctor


class ServantType(DjangoObjectType):
    class Meta:
        model = Publicservant


class UserType(DjangoObjectType):
    class Meta:
        model = Users


class RecordType(DjangoObjectType):
    class Meta:
        model = Record


class DiseaseType(DjangoObjectType):
    class Meta:
        model = Disease


class LoginAdmin(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    status = graphene.Int()

    def mutate(self, info, email, password):
        user = Admin.get(email=email, password=password)
        if user:
            return LoginAdmin(status=200)
        else:
            return LoginAdmin(status=404)


class MakeRecord(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        cname = graphene.String(required=True)
        disease_code = graphene.String(required=True)
        total_patients = graphene.Int(required=True)
        total_deaths = graphene.Int(required=True)

    record = graphene.Field(RecordType)
    status = graphene.Int()

    def mutate(self, info, email, cname, disease_code, total_patients, total_deaths):
        user = Users.objects.get(email=email)
        if user:
            if not Record.objects.filter(email=user.publicservant, cname=cname, disease_code=disease_code, date_added=datetime.date.today()).exists():
                country = Country.objects.get(cname=cname)
                disease = Disease.objects.get(disease_code=disease_code)
                record = Record.objects.create(
                    cname=country, disease_code=disease, total_patients=total_patients, total_deaths=total_deaths, email=user.publicservant)
                return MakeRecord(record=record, status=200)
        else:
            return MakeRecord(status=404)


class RegisterServant(graphene.Mutation):  # CHANGE FOR SERVANTS
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        name = graphene.String(required=True)
        surname = graphene.String(required=True)
        salary = graphene.Int(required=True)
        phone = graphene.String(required=True)
        cname = graphene.String(required=True)
        dep = graphene.String(required=True)

    servant = graphene.Field(ServantType)
    status = graphene.Int()

    def mutate(self, email, password, name, surname, salary, phone, cname, dep):

        user = Users.filter(email=email).first()
        if not user:  # Check if user with email already exists
            user = Users.create(email=email, password=password, name=name,
                                surname=surname, phone=phone, salary=salary, cname=cname)

        servant = Publicservant.filter(email=user).first()
        if not servant:  # Check if servant with email already exists
            servant = Publicservant(email=user, dep=dep)
            servant.save()

        return RegisterServant(servant=servant, status=200)


class Query(graphene.ObjectType):
    records = graphene.List(
        RecordType,
        email=graphene.String(),
        disease_code=graphene.String(),
        cname=graphene.String()
    )

    diseases = graphene.List(
        DiseaseType,
    )

    def resolve_records(self, info, email, disease_code=None, cname=None):
        qs = Record.objects.all().filter(email=email)
        if disease_code:
            qs = qs.filter(disease_code=disease_code)
        if cname:
            qs = qs.filter(cname=cname)

        return qs

    def resolve_diseases(self, info):
        return Disease.objects.all()


class Mutation(graphene.ObjectType):
    login_admin = LoginAdmin.Field()
    make_record = MakeRecord.Field()
    register_servant = RegisterServant.Field()

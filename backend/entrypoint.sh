#!/bin/sh


python manage.py migrate --noinput
python manage.py collectstatic --noinput

gunicorn hw2.wsgi:application --bind 0.0.0.0:4000
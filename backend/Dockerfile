# FROM python:3.7.4-alpine3.10

# LABEL maintainer="qozha"

# ENV PYTHONUNBUFFERED 1
# ENV PYTHONDONTWRITEBYTECODE 1

# WORKDIR /app/backend

# COPY requirements.txt requirements.txt

# RUN apk add --no-cache \
#     ca-certificates gcc postgresql-dev linux-headers musl-dev \
#     libffi-dev jpeg-dev zlib-dev git

# RUN pip install -U pip

# RUN pip install -r requirements.txt

# EXPOSE 8000

# CMD python3 manage.py runserver 0.0.0.0:8000


# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
WORKDIR /app/backend
COPY . .

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY entrypoint.sh /
ENTRYPOINT [ "sh", "/entrypoint.sh"]
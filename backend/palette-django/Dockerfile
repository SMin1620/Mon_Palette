FROM python:3.9.0
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

COPY . /app/server/palette

WORKDIR /app/server/palette

RUN apt-get update && apt-get install -y cmake && apt-get -y install libgl1-mesa-glx && apt-get install -y --no-install-recommends gcc
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
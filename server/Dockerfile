FROM python:3.8

RUN apt-get update

WORKDIR /code
RUN touch debug.log

COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

FROM python:3.12-alpine3.19

WORKDIR /code

EXPOSE 8000

COPY --chown=root:root . /code/
RUN pip install -r requirements.txt

ENTRYPOINT [ "/code/django.sh" ]
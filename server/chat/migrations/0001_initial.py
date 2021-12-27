from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import migrations


def add_users(apps, schema_editor):
    user = apps.get_model(*settings.AUTH_USER_MODEL.split("."))
    db_alias = schema_editor.connection.alias
    user.objects.using(db_alias).bulk_create([
        user(pk=1, username="dan", is_active=False, first_name="Dan", last_name="Oleynik", email="dan@harmonic.com", password=make_password("D1234!")),
        user(pk=2, username="odette", is_active=False, email="odette@harmonic.com", password=make_password("O1234!")),
        user(pk=3, username="mor", is_active=False, first_name="Mor", last_name="Uzar", email="mor@harmonic.com", password=make_password("M1234!")),
        user(pk=4, username="gali", is_active=False, first_name="Gali", last_name="Schwartz", email="gali@harmonic.com", password=make_password("G1234!")),
        user(pk=5, username="esti", is_active=False, email="esti@harmonic.com", password=make_password("E1234!"))
    ])


def delete_users(apps, schema_editor):
    user = apps.get_model(*settings.AUTH_USER_MODEL.split("."))
    db_alias = schema_editor.connection.alias
    user.objects.using(db_alias).bul.filter(pk=1).delete()
    user.objects.using(db_alias).filter(pk=2).delete()
    user.objects.using(db_alias).filter(pk=3).delete()
    user.objects.using(db_alias).filter(pk=4).delete()
    user.objects.using(db_alias).filter(pk=5).delete()


class Migration(migrations.Migration):
    dependencies = [
    ]

    operations = [
        migrations.RunPython(add_users, delete_users),
    ]

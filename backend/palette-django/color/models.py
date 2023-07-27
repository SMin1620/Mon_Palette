from django.db import models


class Color(models.Model):
    name = models.CharField('컬러 이름', max_length=100)

    class Meta:
        db_table = 'colors'

    def __str__(self):
        return self.name

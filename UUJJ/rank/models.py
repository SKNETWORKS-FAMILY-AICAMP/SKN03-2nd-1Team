# myapp/models.py
# myapp/models.py
from django.db import models

class CodeTb(models.Model):
    code = models.CharField(primary_key=True, max_length=50)
    code_name = models.CharField(max_length=100)
    code_desc = models.TextField(blank=True, null=True)
    parent_code = models.ForeignKey('self', models.DO_NOTHING, db_column='parent_code', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'code_tb'


class PlaceTb(models.Model):
    place_id = models.AutoField(primary_key=True)
    city_cd = models.ForeignKey(CodeTb, models.DO_NOTHING, db_column='city_cd', blank=True, null=True)
    category_cd = models.ForeignKey(CodeTb, models.DO_NOTHING, db_column='category_cd', related_name='placetb_category_cd_set', blank=True, null=True)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    review_num = models.IntegerField(blank=True, null=True)
    map_url = models.URLField(blank=True, null=True)
    img_url = models.URLField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'place_tb'



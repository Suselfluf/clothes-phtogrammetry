from rest_framework import serializers
from .models import Clothes, CoverImage, Clothes_V2, ImagesToConvert, ArObject

class ClothesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clothes
        fields = ('__all__')
        
class CoverImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverImage
        fields = ("__all__")

class ConvertingImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesToConvert
        fields = ("__all__")
           
class AugModelSerializer(serializers.ModelSerializer):
    converting_images = serializers.SerializerMethodField()

    class Meta:
        model = ArObject
        fields = ("__all__")
        
    def get_converting_images(self, obj):
        aug_model_instances = ImagesToConvert.objects.all().filter(aug_model_id=obj.id)
        if aug_model_instances.exists():
            return ConvertingImagesSerializer(aug_model_instances, many=True).data
        else:
            return None

class ClothesV2Serializer(serializers.ModelSerializer):
    aug_model = serializers.SerializerMethodField()
    cover_images = serializers.SerializerMethodField()
    
    class Meta:
        model = Clothes_V2
        fields = ('__all__')
        
    def get_aug_model(self, obj):
        # aug_model_instance = ArObject.objects.get(cloth=obj.id)
        # return AugModelSerializer(aug_model_instance).data
        try:
            aug_model_instance = ArObject.objects.get(cloth=obj.id)
        except ArObject.DoesNotExist:
            return []
        return AugModelSerializer(aug_model_instance).data
    
    def get_cover_images(self, obj):
        try:
            cover_images = CoverImage.objects.all().filter(cloth=obj.id)
        except ArObject.DoesNotExist:
            return []
        return CoverImagesSerializer(cover_images, many=True).data
        
        
        



class ImagesToConvertSerializer(serializers.ModelSerializer):
    aug_model_id = serializers.ReadOnlyField(source="aug_model.id")
    class Meta:
        model = ImagesToConvert
        fields = (['id','convertingimages','aug_model_id'])
        


class ArObjectSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = ArObject
        fields = ("__all__")

class ClothesCoverInfoSerializer(serializers.ModelSerializer):
    cover_images = serializers.SerializerMethodField()
    def get_cover_images(self, obj):
        cover_images = CoverImage.objects.all().filter(cloth=obj.id)
        if cover_images.exists():
            return CoverImagesSerializer(cover_images, many=True).data
        else:
            return None
    
    class Meta:
        model = Clothes_V2
        fields = ('__all__')
        
    
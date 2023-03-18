
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

# from .producer import publish
from .serializers import ClothesSerializer, ClothesV2Serializer, ClothesCoverInfoSerializer, ConvertingImagesSerializer, CoverImagesSerializer,ArObjectSerializer
from .models import Clothes, Clothes_V2, CoverImage, ImagesToConvert, ArObject
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from django.http import FileResponse



class ClothesModelView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request):
        
        clothes = Clothes.objects.all()
        serializer = ClothesSerializer(clothes,many=True)
        
        return Response(serializer.data)
          
    def post(self, request):
        serializer = ClothesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

 
class ClothesView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None):
        clothes = Clothes.objects.get(id=pk)
        serializer = ClothesSerializer(clothes)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        clothes = Clothes.objects.get(id=pk)
        serializer = ClothesSerializer(instance=clothes, data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        clothes = Clothes.objects.get(id=pk)
        clothes.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class ClothManagement(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None):

        cloth = Clothes_V2.objects.get(id=pk)
        serializer = ClothesV2Serializer(cloth,many=False)
        
        return Response(serializer.data)
        

    
    def put(self, request, pk=None):
        cloth = Clothes_V2.objects.get(id=pk)
        serializer = ClothesV2Serializer(instance=cloth, data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        clothes = Clothes.objects.get(id=pk)
        clothes.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class ClothesModelViewV2(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None):
        # cloth = Clothes_V2.objects.all()
        # serializer = ClothesV2Serializer(cloth,many=True)
        
        # return Response(serializer.data)
    
        clothes = Clothes_V2.objects.all()
        serializer = ClothesCoverInfoSerializer(clothes,many=True)
        
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        cloth = Clothes_V2.objects.all()
        serializer = ClothesV2Serializer(cloth,many=True)
        
        return Response(serializer.data)
    
    def delete(self, request, pk=None):
        clothes = Clothes.objects.get(id=pk)
        clothes.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CoverImagesForCloth(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None):

        cover_images = CoverImage.objects.all().filter(cloth=pk)
        serializer = CoverImagesSerializer(cover_images,many=True)
        
        return Response(serializer.data)
    
    def post(self, request, pk=None):
    
        serializer = CoverImagesSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            cover_images = CoverImage.objects.all().filter(cloth=pk)
            response_cover_images = CoverImagesSerializer(cover_images,many=True)
            return Response(response_cover_images.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):  ## Needs to be reworked (wrong url formation)
        
        cloth_id = request.data.get('cloth')
        cover_image_id = request.data.get('id')
        cover_image = CoverImage.objects.get(id=cover_image_id)
        cover_image.delete()
        cover_images = CoverImage.objects.all().filter(cloth=cloth_id)
        serializer = CoverImagesSerializer(cover_images,many=True)
        
        return Response(serializer.data)
        
class ConvertingImagesForAugObject(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None):
        aug_model_id = request.data.get('aug_model')
        converting_images = ImagesToConvert.objects.all().filter(aug_model=aug_model_id)
        response_converting_images = ConvertingImagesSerializer(converting_images,many=True)
        return Response(response_converting_images.data, status=status.HTTP_200_OK)
        
        # print(request.data)
        # converting_images = ImagesToConvert.objects.all()
        # serializer = CoverImagesSerializer(converting_images,many=True)
        
        # return Response(serializer.data)
    
    # def put(self, request, pk=None):
    #     print(request.data)
    #     folder_name = request.data.get('folder-name')
    #     converting_array = []
    #     for file in request.FILES.getlist('files'):
    #         if file.content_type.startswith('image'):
    #             converting_array.append(file)
    #     print(folder_name, converting_array)
    #     converting_images = ImagesToConvert.objects.all()
    #     serializer = ConvertingImagesSerializer(converting_images,many=True)
        
    #     return Response(serializer.data)
    
      
    
    def post(self, request, pk=None):
        # folder_name = request.data.get('folder-name')
        aug_model_pn, converting_images_pn = request.data 
        aug_model_id = request.data.get('aug_model')
        for file in request.FILES.getlist('convertingimages'):
            print({aug_model_pn:aug_model_id, converting_images_pn:file})
            req = {aug_model_pn:aug_model_id, converting_images_pn:file}
            serializer = ConvertingImagesSerializer(data=req)
            if (serializer.is_valid(raise_exception=True)):
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        converting_images = ImagesToConvert.objects.all().filter(aug_model=aug_model_id)
        response_converting_images = ConvertingImagesSerializer(converting_images,many=True)
        return Response(response_converting_images.data, status=status.HTTP_201_CREATED)
            


class AugmentedObjView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None):

        aug_object = ArObject.objects.all().filter(cloth=pk)
        aug_object_serialized = ArObjectSerializer(aug_object,many=True)
        # return FileResponse(aug_object_serialized, content_type='image/png')
        return Response(aug_object_serialized.data, status=status.HTTP_200_OK)
    
   
        
class ClothesAugView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None):
        clothes = Clothes.objects.get(id=pk)
        response = clothes
        return FileResponse(response, content_type='image/png')
    
  
        
    
    
    
from .models import Usuario, Biomas, Criaturas, Blocos, Estruturas, Jogadores
from .serializers import UsuarioSerializer, BiomaSerializer, CriaturaSerializer, BlocoSerializer, EstruturaSerializer, JogadorSerializer, UsuarioCadastrado, LoginUsuario
from .permissions import IsAdmin, IsJogador
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
import pandas as pd
import random

# Create your views here.

class UsuarioLogado(TokenObtainPairView):
    serializer_class = LoginUsuario

class VerUsuarios(ListAPIView):
    queryset = Usuario.objects.all()

    permission_classes = [IsAdmin]

    serializer_class = UsuarioSerializer

class LCBiomas(ListCreateAPIView):
    queryset = Biomas.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = BiomaSerializer

class UDBiomas(RetrieveUpdateDestroyAPIView):
    queryset = Biomas.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = BiomaSerializer

    lookup_field = "pk"

class LCCriaturas(ListCreateAPIView):
    queryset = Criaturas.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = CriaturaSerializer

class UDCriaturas(RetrieveUpdateDestroyAPIView):
    queryset = Criaturas.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = CriaturaSerializer

    lookup_field = "pk"

class LCBlocos(ListCreateAPIView):
    queryset = Blocos.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = BlocoSerializer

class UDBlocos(RetrieveUpdateDestroyAPIView):
    queryset = Blocos.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = BlocoSerializer

    lookup_field = "pk"

class LCEstruturas(ListCreateAPIView):
    queryset = Estruturas.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = EstruturaSerializer

class UDEstrutras(RetrieveUpdateDestroyAPIView):
    queryset = Estruturas.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = EstruturaSerializer

    lookup_field = "pk"

class LCJogadores(ListCreateAPIView):
    queryset = Jogadores.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = JogadorSerializer

class UDJogadores(RetrieveUpdateDestroyAPIView):
    queryset = Jogadores.objects.all()

    permission_classes = [IsAuthenticated]

    serializer_class = JogadorSerializer

    lookup_field = "pk"

class CadastroUsuario(ListCreateAPIView):
    queryset = Usuario.objects.all()

    permission_classes = [AllowAny]

    serializer_class = UsuarioCadastrado

class GeradorSeeds(APIView):
    permission_classes = [IsJogador]

    def get(self, request, *args, **kwargs):
        seed = random.randint(-9223372036854775808, 9223372036854775807)

        return Response({"seed": seed}, status=status.HTTP_200_OK)
    
class ExportarBiomasJSON(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        biomas = Biomas.objects.all().values()

        if not biomas:
            return JsonResponse({"mensagem": "Nenhum bioma encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        df = pd.DataFrame(list(biomas))

        dados_json = df.to_json(orient="records", indent=4, force_ascii=False)

        return JsonResponse(dados_json, safe=False, json_dumps_params={"indent": 4})
    
class ExportarCriaturasJSON(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        criaturas = Criaturas.objects.all().values()

        if not criaturas:
            return JsonResponse({"messagem": "Nenhuma criatura encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
        df = pd.DataFrame(list(criaturas))

        dados_json = df.to_json(orient="records", indent=4, force_ascii=False)

        return JsonResponse(dados_json, safe=False, json_dumps_params={"indent": 4})
    
class ExportarBlocosJSON(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        blocos = Blocos.objects.all().values()

        if not blocos:
            return JsonResponse({"messagem": "Nenhum bloco encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        df = pd.DataFrame(list(blocos))

        dados_json = df.to_json(orient="records", indent=4, force_ascii=False)

        return JsonResponse(dados_json, safe=False, json_dumps_params={"indent": 4})
    
class ExportarEstruturasJSON(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        estruturas = Estruturas.objects.all().values()

        if not estruturas:
            return JsonResponse({"messagem": "Nenhuma estrutura encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
        df = pd.DataFrame(list(estruturas))

        dados_json = df.to_json(orient="records", indent=4, force_ascii=False)

        return JsonResponse(dados_json, safe=False, json_dumps_params={"indent": 4})
    
class ExportarJogadoresJSON(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        jogadores = Jogadores.objects.all().values()

        if not jogadores:
            return JsonResponse({"messagem": "Nenhum jogador encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
        df = pd.DataFrame(list(jogadores))

        dados_json = df.to_json(orient="records", indent=4, force_ascii=False)

        return JsonResponse(dados_json, safe=False, json_dumps_params={"indent": 4})
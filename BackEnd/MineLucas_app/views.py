from .models import Usuario, Biomas, Criaturas, Blocos, Estruturas
from .serializers import UsuarioSerializer, BiomaSerializer, CriaturaSerializer, BlocoSerializer, EstruturaSerializer, UsuarioCadastrado, LoginUsuario
from .permissions import IsAdmin, IsJogador
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class UsuarioLogado(TokenObtainPairView):
    serializer_class = LoginUsuario

class VerUsuarios(ListAPIView):
    queryset = Usuario.objects.all()

    permission_classes = [IsAdmin]

    serializer_class = UsuarioSerializer

class LCBiomas(ListCreateAPIView):
    queryset = Biomas.objects.all()

    permission_classes = [IsJogador]

    serializer_class = BiomaSerializer

class UDBiomas(RetrieveUpdateDestroyAPIView):
    queryset = Biomas.objects.all()

    permission_classes = [IsJogador]

    serializer_class = BiomaSerializer

    lookup_field = "pk"

class LCCriaturas(ListCreateAPIView):
    queryset = Criaturas.objects.all()

    permission_classes = [IsJogador]

    serializer_class = CriaturaSerializer

class UDCriaturas(RetrieveUpdateDestroyAPIView):
    queryset = Criaturas.objects.all()

    permission_classes = [IsJogador]

    serializer_class = CriaturaSerializer

    lookup_field = "pk"

class LCBlocos(ListCreateAPIView):
    queryset = Blocos.objects.all()

    permission_classes = [IsJogador]

    serializer_class = BlocoSerializer

class UDBlocos(RetrieveUpdateDestroyAPIView):
    queryset = Blocos.objects.all()

    permission_classes = [IsJogador]

    serializer_class = BlocoSerializer

    lookup_field = "pk"

class LCEstruturas(ListCreateAPIView):
    queryset = Estruturas.objects.all()

    permission_classes = [IsJogador]

    serializer_class = EstruturaSerializer

class UDEstrutras(RetrieveUpdateDestroyAPIView):
    queryset = Estruturas.objects.all()

    permission_classes = [IsJogador]

    serializer_class = EstruturaSerializer

    lookup_field = "pk"

class CadastroUsuario(ListCreateAPIView):
    queryset = Usuario.objects.all()

    permission_classes = [AllowAny]

    serializer_class = UsuarioCadastrado
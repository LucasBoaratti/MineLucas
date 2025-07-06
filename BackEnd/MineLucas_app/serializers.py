from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Usuario, Biomas, Criaturas, Blocos, Estruturas
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario

        fields = "__all__"

class BiomaSerializer(ModelSerializer):
    class Meta:
        model = Biomas

        fields = "__all__"

class CriaturaSerializer(ModelSerializer):
    class Meta:
        model = Criaturas

        fields = "__all__"

class BlocoSerializer(ModelSerializer):
    class Meta:
        model = Blocos

        fields = "__all__"

class EstruturaSerializer(ModelSerializer):
    class Meta:
        model = Estruturas

        fields = "__all__"

class UsuarioCadastrado(serializers.ModelSerializer): #Classe que realiza o cadastro do usuário
    funcoes = [
        ("Jogador", "Jogador"),
        ("Admin", "Admin"),
    ]

    username = serializers.CharField()
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    confirmarSenha = serializers.CharField(write_only=True)
    funcao = serializers.ChoiceField(choices=funcoes)

    class Meta:
        model = Usuario

        fields = [
            "username", 
            "email",
            "password",
            "confirmarSenha",
            "funcao",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }
     
    def validate(self, data): #Validando as senhas
        if data["password"] != data["confirmarSenha"]:
            raise serializers.ValidationError("As senhas estão diferentes.")
        return data
    
    def create(self, validated_data): #Criando o usuário e salvando no banco de dados
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]
        funcao = validated_data["funcao"]

        usuario = Usuario(
            username=username,
            email=email,
            password=password,
            funcao=funcao,
        )   

        usuario.set_password(password)

        usuario.save()

        return usuario
    
class LoginUsuario(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data["Usuário"] = {
            "Nome": self.user.username,
            "Função": self.user.funcao,
        }

        return data
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

dimensao = [
     ("Overworld", "Overworld"),
     ("Nether", "Nether"),
     ("The End", "The End"),
]

class Usuario(AbstractUser):
     funcoes = [
          ("Jogador", "Jogador"),
          ("Admin", "Admin"),
     ]

     funcao = models.CharField(max_length=255, choices=funcoes, default="Jogador")

     def __str__(self):
          return self.username

class Biomas(models.Model):
     clima_bioma = [
          ("Frio", "Frio"),
          ("Ameno", "Ameno"),
          ("Quente", "Quente"),
     ]
     
     nome = models.CharField(max_length=255)
     vegetacao = models.CharField(max_length=255)
     clima = models.CharField(max_length=255, choices=clima_bioma, default="Frio")
     chuva = models.BooleanField()
     dimensao = models.CharField(max_length=255, choices=dimensao, default="Overworld")
     foto = models.TextField()

     def __str__(self):
          return self.nome

class Criaturas(models.Model):
     nome = models.CharField(max_length=255)
     tipo = models.CharField(max_length=255)
     tamanho = models.PositiveIntegerField()
     vida = models.PositiveBigIntegerField()
     drop_itens = models.TextField()
     habilidade_especial = models.BooleanField()
     montado = models.BooleanField()
     dimensao_criatura = models.CharField(max_length=255, choices=dimensao, default="Overworld")
     bioma_spawn = models.ForeignKey("Biomas", on_delete=models.CASCADE)
     foto = models.TextField()

     def __str__(self):
          return self.nome
     
class Blocos(models.Model):
     ferramentas = [
          ("Picareta", "Picareta"),
          ("Machado", "Machado"),
          ("Pá", "Pá"),
          ("Enxada", "Enxada"),
     ]
     
     nome = models.CharField(max_length=255)
     textura = models.CharField(max_length=255)
     durabilidade = models.FloatField()
     brilho = models.BooleanField()
     inflamavel = models.BooleanField()
     interagivel = models.BooleanField()
     altura = models.PositiveIntegerField()
     geracao = models.CharField(max_length=255)
     ferramenta_quebra = models.CharField(max_length=255, choices=ferramentas, default="Picareta")
     foto = models.TextField()

     def __str__(self):
          return self.nome
     
class Estruturas(models.Model):
     nome = models.CharField(max_length=255)
     dimensao = models.CharField(max_length=255, choices=dimensao, default="Overworld")
     tipo = models.CharField(max_length=255)
     tamanho = models.CharField(max_length=255)
     bioma = models.ForeignKey("Biomas", on_delete=models.CASCADE)
     foto = models.TextField()

     def __str__(self):
          return self.nome
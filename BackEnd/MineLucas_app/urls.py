from django.urls import path
from .views import UsuarioLogado, VerUsuarios, LCBiomas, UDBiomas, LCCriaturas, UDCriaturas, LCBlocos, UDBlocos, LCEstruturas, UDEstrutras, LCJogadores, UDJogadores, CadastroUsuario, GeradorSeeds, ExportarBiomasJSON, ExportarCriaturasJSON, ExportarBlocosJSON, ExportarEstruturasJSON, ExportarJogadoresJSON

urlpatterns = [
    path('cadastro/', view=CadastroUsuario.as_view(), name="Cadastro do usuário"),
    path('login/', view=UsuarioLogado.as_view(), name="Login do usuário"),
    path('usuarios/', view=VerUsuarios.as_view(), name="Ver usuários cadastrados."),
    path('biomas/', view=LCBiomas.as_view(), name="Ver e criar biomas."),
    path('biomas/<int:pk>/', view=UDBiomas.as_view(), name="Atualizar e deletar biomas."),
    path('criaturas/', view=LCCriaturas.as_view(), name="Ver e criar criaturas."),
    path('criaturas/<int:pk>/', view=UDCriaturas.as_view(), name="Atualizar e deletar criaturas."),
    path('blocos/', view=LCBlocos.as_view(), name="Ver e criar blocos."),
    path('blocos/<int:pk>/', view=UDBlocos.as_view(), name="Atualizar e deletar blocos."),
    path('estruturas/', view=LCEstruturas.as_view(), name="Ver e criar estruturas."),
    path('estruturas/<int:pk>/', view=UDEstrutras.as_view(), name="Atualizar e deletar estruturas."),
    path('jogadores/', view=LCJogadores.as_view(), name="Ver e criar jogadores/youtubers."),
    path('jogadores/<int:pk>/', view=UDJogadores.as_view(), name="Atualizar e deletar jogadores."),
    path('seed/', view=GeradorSeeds.as_view(), name="Gerador de seeds no Minecraft."),
    path('exportarBiomas/', view=ExportarBiomasJSON.as_view(), name="Exportar biomas em JSON."),
    path('exportarCriaturas/', view=ExportarCriaturasJSON.as_view(), name="Exportar criaturas em JSON."),
    path('exportarBlocos/', view=ExportarBlocosJSON.as_view(), name="Exportar blocos em JSON."),
    path('exportarEstruturas/', view=ExportarEstruturasJSON.as_view(), name="Exportar estruturas em JSON."),
    path('exportarJogadores/', view=ExportarJogadoresJSON.as_view(), name="Exportar jogadores em JSON."),
]
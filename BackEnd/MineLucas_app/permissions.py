from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.funcao == "Admin":
            return True
        return False
    
class IsJogador(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_autheticated and request.user.funcao == "Jogador":
            return True
        return False
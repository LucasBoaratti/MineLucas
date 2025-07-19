import { PermissaoModal } from "../Modais/Permissoes/PermissaoModal";

export function Permissao({ children }) {
    const funcao = localStorage.getItem("funcaoUsuario");

    if(funcao !== "Admin") {
        return <PermissaoModal openModal={true}/>
    }
}
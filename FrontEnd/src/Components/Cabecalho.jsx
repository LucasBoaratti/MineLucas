import Logo from "../assets/Images/Logo_MineLucas.png";
import css from "../Styles/Cabecalho.module.css";

export function Cabecalho() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const funcaoUsuario = localStorage.getItem("funcaoUsuario");

    return (
        <header>
            <section className={css.cabecalho}> 
                <img src={Logo} alt="Logo da MineLucas com fundo verde, uma carinha de Creeper preta e o nome do site, MineLucas em letras brancas." />
                <div className={css.links}>
                    <p>Seeds</p>
                    <p>Mapas</p>  
                    <p>Tutoriais</p>
                    <p>Mods</p>  
                </div>
                <div className={css.perfil}>
                    <h2>Perfil ativo:</h2>
                    <p>{nomeUsuario}</p>
                    <p>{funcaoUsuario}</p>
                </div>
            </section>
        </header>
    );
}
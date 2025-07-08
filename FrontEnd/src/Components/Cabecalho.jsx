import Logo from "../assets/Images/Logo_MineLucas.png";
import css from "../Styles/Cabecalho.module.css";

export function Cabecalho() {
    return (
        <header>
            <img src={Logo} alt="Logo da MineLucas com fundo verde, uma carinha de Creeper preta e o nome do site, MineLucas em letras brancas." />
            <div className={css.links}>
                <p>Biomas</p>
                <p>Criaturas</p>
                <p>Blocos</p>
                <p>Estruturas</p>
                <p>Jogadores</p>
                <p>Seeds</p>
                <p>Mapas</p>
            </div>
        </header>
    );
}
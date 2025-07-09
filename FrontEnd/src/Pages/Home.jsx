import css from "../Styles/Home.module.css";
import Titulo from "../assets/Images/Titulo_Home.png";

export function Home() {
    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }} className={css.homeContainer}>
            <section>
                <div className={css.imagem}>
                    <img src={Titulo} alt="Letreiro de letras do Minecraft com a escrita MineLucas." />
                </div>
                <section className={css.cruds}>
                    <div className={css.botao}>
                        <button type="button">Biomas</button>
                    </div>
                    <div className={css.botao}>
                        <button type="button">Criaturas</button>
                    </div>
                    <div className={css.botao}>
                        <button type="button">Blocos</button>
                    </div>
                    <div className={css.botao}>
                        <button type="button">Estruturas</button>
                    </div>
                    <div className={css.botao}>
                        <button type="button">Jogadores</button>
                    </div>
                </section>
            </section>
        </main>
    );
}
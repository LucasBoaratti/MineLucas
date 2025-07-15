import css from "./Home.module.css";
import Titulo from "../../assets/Images/Titulo_Home.png";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }} className={css.homeContainer}>
            <section>
                <div className={css.imagem}>
                    <img src={Titulo} alt="Letreiro de letras do Minecraft com a escrita MineLucas." />
                </div>
                <section className={css.cruds}>
                    <div className={css.botao}>
                        <button 
                            type="button" 
                            onClick={() => navigate("/biomas")}>
                            Biomas
                        </button>
                    </div>
                    <div className={css.botao}>
                        <button 
                            type="button"
                            onClick={() => navigate("/criaturas")}>
                            Criaturas
                        </button>
                    </div>
                    <div className={css.botao}>
                        <button 
                            type="button"
                            onClick={() => navigate("/blocos")}>
                            Blocos
                        </button>
                    </div>
                    <div className={css.botao}>
                        <button 
                            type="button"
                            onClick={() => navigate("/estruturas")}>
                            Estruturas
                        </button>
                    </div>
                    <div className={css.botao}>
                        <button 
                            type="button"
                            onClick={() => navigate("/jogadores")}>
                            Jogadores
                        </button>
                    </div>
                </section>
            </section>
        </main>
    );
}
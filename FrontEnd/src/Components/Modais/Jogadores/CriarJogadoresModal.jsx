import css from "./CriarJogadoresModal.module.css";
import { useNavigate } from "react-router-dom";

export function CriarJogadoresModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate(); 
    
    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalCriarJogador}>
                <h1>Jogador criado com sucesso!</h1>
                <div className={css.botao}>
                    <button 
                        type="button"
                        onClick={() => navigate("/jogadores")}>
                        Avançar
                    </button>
                </div>
            </section>
        </main>
    );
}
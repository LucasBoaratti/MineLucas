import css from "./EditarJogadoresModal.module.css";
import { useNavigate } from "react-router-dom";

export function EditarJogadoresModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    } 

    const navigate = useNavigate();
    
    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalEditarJogador}>
                <h1>Jogador editado com sucesso!</h1>
                <div className={css.botao}>
                    <button 
                        type="button"
                        onClick={() => navigate("/jogadores")}
                        className={css.botaoAvancar}>
                        Avançar
                    </button>
                </div>
            </section>
        </main>
    );
}
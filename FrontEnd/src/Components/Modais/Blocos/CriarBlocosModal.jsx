import { useNavigate } from "react-router-dom";
import css from "./CriarBlocosModal.module.css";

export function CriarBlocosModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }} className={css.modalContainer}>
            <section className={css.modalCriarBloco}>   
                <h1>Bloco criado com sucesso!</h1>
                <div className={css.botao}>
                    <button 
                        type="button"
                        onClick={() => navigate("/blocos")}>
                        Avançar
                    </button>
                </div>
            </section>
        </main>
    );
}
import css from "./EditarEstruturasModal.module.css";
import { useNavigate } from "react-router-dom";

export function EditarEstruturasModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalEditarEstruturas}>
                <h1>Estrutura editada com sucesso!</h1>
                    <div className={css.botao}>
                        <button 
                            type="button"
                            onClick={() => navigate("/estruturas")}>
                            Avançar
                        </button>
                    </div>
            </section>
        </main>
    );
}
import { useNavigate } from "react-router-dom";
import css from "./CriarEstruturasModal.module.css";

export function CriarEstruturasModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalCriarEstrutura}>
                <h1>Estrutura criada com sucesso!</h1>
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
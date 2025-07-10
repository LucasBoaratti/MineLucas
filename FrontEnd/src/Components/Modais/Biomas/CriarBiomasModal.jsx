import css from "./CriarBiomasModal.module.css";
import { useNavigate } from "react-router-dom";

export function CriarBiomasModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalCriarBioma}>
                <h1>Bioma criado com sucesso!</h1>
                <div className={css.botao}>
                    <button 
                        type="button"
                        onClick={() => navigate("/biomas")}>
                        Avançar
                    </button>
                </div>
            </section>
        </main>
    );
}
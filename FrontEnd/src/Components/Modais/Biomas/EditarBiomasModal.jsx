import css from "./EditarBiomasModal.module.css";
import { useNavigate } from "react-router-dom";

export function EditarBiomasModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalEditarBioma}>
                <h1>Bioma editado com sucesso!</h1>
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
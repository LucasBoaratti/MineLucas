import { useNavigate } from "react-router-dom";
import css from "./EditarBlocosModal.module.css";

export function EditarBlocosModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalEditarBloco}>
                <h1>Bioma editado com sucesso!</h1>
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
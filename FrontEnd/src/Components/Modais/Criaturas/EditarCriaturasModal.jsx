import css from "./EditarCriaturasModal.module.css";
import { useNavigate } from "react-router-dom";

export function EditarCriaturasModal({ openModal, closeModal }) {
     if(!openModal) {
          return null;
     }

     const navigate = useNavigate();

     return (
          <main className={css.modalContainer}>
               <section className={css.modalEditarCriaturas}>
                    <h1>Criatura editada com sucesso!</h1>
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
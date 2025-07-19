import css from "./CriarCriaturasModal.module.css";
import { useNavigate } from "react-router-dom";

export function CriarCriaturasModal({ openModal, closeModal }) {
     if(!openModal) {
          return null;
     }

     const navigate = useNavigate();

     return (
          <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.modalCriarCriatura}>
                    <h1>Criatura criada com sucesso!</h1>
                    <div className={css.botao}>
                         <button 
                              type="button"
                              onClick={() => navigate("/criaturas")}>
                              Avançar
                         </button>
                    </div>
               </section>
          </main>
     );
}
import { useNavigate } from "react-router-dom";
import css from "../Styles/LoginModalFracasso.module.css";

export function LoginModalFracasso({ openModal, closeModal }) {
     if (!openModal) {
          return null;
     }

     const navigate = useNavigate();

     return (
          <main className={css.modalContainer}>
               <section className={css.modalLogin}>
                    <h1>Usuário não cadastrado ou senha incorretos.</h1>
                    <div className={css.botao}>
                         <button 
                              type="button"
                              onClick={() => navigate("/")}>
                              Voltar
                         </button>
                    </div>
               </section>
          </main>
     );   
}
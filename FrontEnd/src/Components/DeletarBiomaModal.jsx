import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DeletarBiomaModal({ openModal, closeModal, atualizarCard, idBioma }) {
     if(!openModal) {
          return null;
     }

     const navigate = useNavigate();

     async function delete_bioma() {
          const id_bioma = localStorage.getItem("idBioma");

          const token = localStorage.getItem("access_token");

          if(!token) {
               console.log("Token não encontrado.");
          }

          try {
               await axios.delete(`http://127.0.0.1:8000/MineLucas/biomas/${id_bioma}`, {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json",
                    },
               });

               alert("Bioma deletado com sucesso!");

               closeModal();

               atualizarCard();

               navigate("/biomas");
          }
          catch(error) {
               console.error("Erro ao deletar bioma: ", error.response?.data || error.message);
          }
     }

     return (
          <main className={css.modalContainer}>
               <section className={css.modalDeletarBioma}>
                    <h1>Tem certeza que deseja deletar esse bioma?</h1>
                    <div className={css.botoes}>
                         <button 
                              type="submit"
                              onClick={delete_bioma}>
                              Sim
                         </button>
                         <button 
                              type="button"
                              onClick={closeModal}>
                              Não
                         </button>
                    </div>
               </section>
          </main>
     );
}
import { useNavigate } from "react-router-dom";
import css from "./DeletarCriaturaModal.module.css";
import axios from "axios";

export function DeletarCriaturaModal({ openModal, closeModal, atualizarCard }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    async function delete_criatura() {
        const token = localStorage.getItem("access_token");

        if (!token) {
            console.log("Token não encontrado.");
        }

        const id_criatura = localStorage.getItem("idCriatura");

        try {
            await axios.delete(`http://127.0.0.1:8000/MineLucas/criaturas/${id_criatura}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Criatura deletada com sucesso!");

            closeModal();

            atualizarCard();

            navigate("/criaturas");
        }
        catch(error) {
            console.error("Erro ao deletar criatura: ", error.response?.data || error.message);
        }
    }

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalDeletarCriatura}>
                <h1>Tem certeza que deseja deletar essa criatura?</h1>
                <div className={css.botoes}>
                    <button 
                        type="submit"
                        onClick={delete_criatura}>
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
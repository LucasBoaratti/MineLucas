import axios from "axios";
import css from "./DeletarEstruturaModal.module.css";
import { useNavigate } from "react-router-dom";

export function DeletarEstruturaModal({ openModal, closeModal, atualizarCard }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    async function delete_estrutura() {
        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        const idEstrutura = localStorage.getItem("idEstrutura");

        try {
            await axios.delete(`http://127.0.0.1:8000/MineLucas/estruturas/${idEstrutura}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Estrutura deletada com sucesso!");

            closeModal();

            atualizarCard();

            navigate("/estruturas");
        }
        catch(error) {
            console.error("Erro ao deletar estrutura: ", error.response?.data || error.message);
        }
    }

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalDeletarEstrutura}>
                <h1>Tem certeza que deseja deletar essa estrutura?</h1>
                <div className={css.botoes}>
                    <button 
                        type="submit"
                        onClick={delete_estrutura}>
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
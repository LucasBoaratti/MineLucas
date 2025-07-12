import axios from "axios";
import css from "./DeletarBlocoModal.module.css";
import { useNavigate } from "react-router-dom";

export function DeletarBlocoModal({ openModal, closeModal, atualizarCard }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    async function delete_bloco() {
        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        const idBloco = localStorage.getItem("idBloco");

        try {
            await axios.delete(`http://127.0.0.1:8000/MineLucas/blocos/${idBloco}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Bloco deletado com sucesso!");

            closeModal();

            atualizarCard();

            navigate("/blocos");
        }
        catch(error) {
            console.error("Erro ao deletar bloco: ", error.response?.data || error.message);
        }
    }

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalDeletarBloco}>
                <h1>Tem certeza que deseja deletar esse bloco?</h1>
                <div className={css.botoes}>
                    <button 
                        type="submit"
                        onClick={delete_bloco}>
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
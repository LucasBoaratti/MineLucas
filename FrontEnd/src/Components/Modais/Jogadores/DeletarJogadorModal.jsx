import css from "./DeletarJogadorModal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function DeletarJogadorModal({ openModal, closeModal, atualizarCard }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    async function delete_jogador() {
        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        const idJogador = localStorage.getItem("idJogador");

        try {
            await axios.delete(`http://127.0.0.1:8000/MineLucas/jogadores/${idJogador}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Jogador deletado com sucesso!");

            closeModal();

            atualizarCard();

            navigate("/jogadores");
        }
        catch(error) {
            console.error("Erro ao deletar jogador: ", error.response?.data || error.message);
        }
    }

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalDeletarJogador}>
                <h1>Você tem certeza que deseja deletar esse jogador?</h1>
                <div className={css.botoes}>
                    <button 
                        type="submit"
                        onClick={delete_jogador}>
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
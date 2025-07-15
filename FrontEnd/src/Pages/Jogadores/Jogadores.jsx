import css from "./Jogadores.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeletarJogadorModal } from "../../Components/Modais/Jogadores/DeletarJogadorModal";
import axios from "axios";

export function Jogadores() {
    const [jogadores, setJogadores] = useState([]);
    const [deletarJogadorModal, setDeletarJogadorModal] = useState(false);
    
    const navigate = useNavigate();

    async function get_jogadores() {
        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        try {
            const response = await axios.get("http://127.0.0.1:8000/MineLucas/jogadores/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setJogadores(response.data);
        }
        catch(error) {
            console.error("Erro ao obter dados dos jogadores: ", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        get_jogadores();
    }, []);

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.cards}>
                <h1>Veja todos os jogadores cadastrados no site.</h1>
                <div className={css.criarJogador}>
                    <button 
                        type="button"
                        onClick={() => navigate("/criarJogador")}>
                        Criar jogador
                    </button>
                </div>
                <section className={css.jogadores}>
                    <section className={css.fileiraCards}>
                        {jogadores.map((jogador, id) => (
                            <section key={id} className={css.cardJogador}> 
                                <div className={css.imagem}>
                                    <img src={jogador.skin} alt="Skin do jogador." />
                                </div>
                                <h2>Nome: {jogador.nome}</h2>
                                <p>Biografia: {jogador.biografia}</p>
                                <p>Youtuber: {jogador.criador_conteudo ? "Sim" : "Não"}</p>
                                <p>
                                    {jogador.canal ? (
                                        <a 
                                            href={jogador.canal} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{ textDecoration:"underline" }}>
                                            Canal do jogador
                                        </a>
                                    ) : (
                                        <p>Esse jogador não tem canal.</p>
                                    )}
                                </p>
                                <p>Ainda joga Minecraft: {jogador.ativo ? "Sim" : "Não"}</p>
                                <div className={css.botoes}>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            localStorage.setItem("idJogador", jogador.id);
                                            localStorage.setItem("nome", jogador.nome);
                                            localStorage.setItem("biografia", jogador.biografia);
                                            localStorage.setItem("youtuber", jogador.criador_conteudo.toString());
                                            localStorage.setItem("canal", jogador.canal);
                                            localStorage.setItem("ativo", jogador.ativo.toString());
                                            localStorage.setItem("skin", jogador.skin);
                                            navigate("/editarJogador");
                                        }}>
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            localStorage.setItem("idJogador", jogador.id);
                                            setDeletarJogadorModal(true);
                                        }}>
                                        Deletar
                                    </button>
                                    <DeletarJogadorModal
                                        openModal={deletarJogadorModal}
                                        closeModal={() => setDeletarJogadorModal(false)}
                                        atualizarCard={get_jogadores}/>
                                </div>
                            </section>
                        ))}
                    </section>
                </section>
            </section>
        </main>
    );
}
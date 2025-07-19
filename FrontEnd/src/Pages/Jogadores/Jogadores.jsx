import css from "./Jogadores.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeletarJogadorModal } from "../../Components/Modais/Jogadores/DeletarJogadorModal";
import { PermissaoModal } from "../../Components/Modais/Permissoes/PermissaoModal";
import axios from "axios";

export function Jogadores() {
    const [jogadores, setJogadores] = useState([]);
    const [deletarJogadorModal, setDeletarJogadorModal] = useState(false);
    const [permissaoModal, setPermissaoModal] = useState(false);
    
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

    function exportar_jogadores_json() {
        const token = localStorage.getItem("access_token");

        axios.get("http://127.0.0.1:8000/MineLucas/exportarJogadores/", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const dados = typeof response.data === "string" 
                ? JSON.parse(response.data)
                : response.data;

            const blob = new Blob([JSON.stringify(dados, null, 2)], {
                type: "application/json",
            });

            const url = URL.createObjectURL(blob);

            const links = document.createElement("a");

            links.href = url;

            links.download = "Jogadores_data.json";

            links.click();

            URL.revokeObjectURL(url);   
        })
        .catch((error) => {
            console.error("Erro ao exportar os jogadores: ", error.response?.data || error.message);

            if(error.response && (error.response.status === 403 || error.response.status === 401)) {
                setPermissaoModal(true);

                return;
            }
        });
    }

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.cards}>
                <h1>Veja todos os jogadores cadastrados no site.</h1>
                <div className={css.botoesJogadores}>
                    <button 
                        type="button" 
                        onClick={() => navigate("/criarJogador")}>
                        Criar jogador
                    </button>
                    <button
                        type="button"
                        onClick={exportar_jogadores_json}
                        style={{ width:"270px" }}> 
                        Exportar jogadores
                    </button>
                    <PermissaoModal 
                        openModal={permissaoModal}
                        closeModal={() => setPermissaoModal(false)}/>
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
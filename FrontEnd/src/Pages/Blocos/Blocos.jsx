import css from "./Blocos.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Blocos() {
    const [blocos, setBlocos] = useState([]);
    const [deletarBlocoModal, setDeletarBlocoModal] = useState(false);

    const navigate = useNavigate();

    async function get_blocos() {
        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        try {
            const response = await axios.get("http://127.0.0.1:8000/MineLucas/blocos/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setBlocos(response.data);
        }
        catch(error) {
            console.error("Erro ao obter dados dos blocos: ", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        get_blocos();
    }, []);

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.cards}>
                <h1>Veja todos os blocos cadastrados no site.</h1>
                <div className={css.criarBloco}>
                    <button 
                        type="button"
                        onClick={() => navigate("/criarBloco")}>
                        Criar bloco
                    </button>
                </div>
                <section className={css.blocos}>
                    <section className={css.fileiraCards}>
                        {blocos.map((bloco, id) => (
                            <section key={id} className={css.cardBloco}>
                                <div className={css.imagem}>
                                    <img 
                                        src={bloco.foto} 
                                        alt="Imagem do bloco." />
                                </div>
                                <h2>Nome: {bloco.nome}</h2>
                                <p>Textura: {bloco.textura}</p>
                                <p>Durabilidade: {bloco.durabilidade}</p>
                                <p>Brilho: {bloco.brilho ? "Sim" : "Não"}</p>
                                <p>Inflamável: {bloco.inflamavel ? "Sim" : "Não"}</p>
                                <p>Interagível: {bloco.interagivel ? "Sim" : "Não"}</p>
                                <p>Altura: {bloco.altura}</p>
                                <p>Geração: {bloco.geracao}</p>
                                <p>Ferramenta: {bloco.ferramenta_quebra}</p>
                                <div className={css.botoes}>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            localStorage.setItem("idBloco", bloco.id);
                                            localStorage.setItem("nome", bloco.nome);
                                            localStorage.setItem("textura", bloco.textura);
                                            localStorage.setItem("durabilidade", bloco.durabilidade);
                                            localStorage.setItem("brilho", bloco.brilho.toString());
                                            localStorage.setItem("inflamavel", bloco.inflamavel.toString());
                                            localStorage.setItem("interagivel", bloco.interagivel.toString());
                                            localStorage.setItem("altura", bloco.altura);
                                            localStorage.setItem("geracao", bloco.geracao);
                                            localStorage.setItem("ferramenta", bloco.ferramenta_quebra);
                                            localStorage.setItem("foto", bloco.foto);
                                            navigate("/editarBloco");
                                        }}>
                                        Editar
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            localStorage.setItem("idBloco", bloco.id);
                                            setDeletarBlocoModal(true);
                                        }}>
                                        Deletar
                                    </button>
                                </div>
                            </section>
                        ))}
                    </section>
                </section>
            </section>
        </main>
    );
}
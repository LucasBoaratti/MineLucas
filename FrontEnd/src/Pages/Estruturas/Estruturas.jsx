import css from "./Estruturas.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Estruturas() {
    const [estruturas, setEstruturas] = useState([]);

    const navigate = useNavigate();

    async function get_estruturas() {
        const token = localStorage.getItem("access_token");
        
        if(!token) {
            console.log("Token não encontrado.");
        }

        try {
            const response = await axios.get("http://127.0.0.1:8000/MineLucas/estruturas/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setEstruturas(response.data);
        }
        catch(error) {
            console.error("Erro ao obter dados da estrutura: ", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        get_estruturas();
    }, []);

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.cards}>
                <h1>Veja todas as estruturas cadastradas no site.</h1>
                <div className={css.criarEstrutura}>
                    <button 
                        type="button"
                        onClick={() => navigate("/criarEstrutura")}>
                        Criar estrutura
                    </button>
                </div>
                <section className={css.estruturas}>
                    <section className={css.fileiraCards}>
                        {estruturas.map((estrutura, id) => (
                            <section key={id} className={css.cardEstrutura}>
                                <div className={css.imagem}>
                                    <img src={estrutura.foto} alt="Imagem da estrutura." />
                                </div>
                                <h2>Nome: {estrutura.nome}</h2>
                                <p>Dimensão: {estrutura.dimensao}</p>
                                <p>Tipo: {estrutura.tipo}</p>
                                <p>Tamanho: {estrutura.tamanho}</p>
                                <div className={css.botoes}>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            localStorage.setItem("idEstrutura", estrutura.id);
                                            localStorage.setItem("nome", estrutura.nome);
                                            localStorage.setItem("dimensao", estrutura.dimensao);
                                            localStorage.setItem("tipo", estrutura.tipo);
                                            localStorage.setItem("tamanho", estrutura.tamanho);
                                            localStorage.setItem("foto", estrutura.foto);
                                            navigate("/editarEstruturas");
                                        }}>
                                        Editar
                                    </button>
                                    <button type="button">Deletar</button>
                                </div>
                            </section>
                        ))}
                    </section>
                </section>
            </section>
        </main>
    );
}
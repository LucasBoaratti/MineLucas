import css from "./Estruturas.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeletarEstruturaModal } from "../../Components/Modais/Estruturas/DeletarEstruturaModal";
import { PermissaoModal } from "../../Components/Modais/Permissoes/PermissaoModal";

export function Estruturas() {
    const [estruturas, setEstruturas] = useState([]);
    const [deletarEstruturaModal, setDeletarEstruturaModal] = useState(false);
    const [permissaoModal, setPermissaoModal] = useState(false);

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

    function exportar_estruturas_json() {
        const token = localStorage.getItem("access_token");

        axios.get("http://127.0.0.1:8000/MineLucas/exportarEstruturas/", {
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

            links.download = "Estruturas_data.json";

            links.click();

            URL.revokeObjectURL(url);   
        })
        .catch((error) => {
            console.error("Erro ao exportar as estruturas: ", error.response?.data || error.message);

            if(error.response && (error.response.status === 403 || error.response.status === 401)) {
                setPermissaoModal(true);

                return;
            }
        });
    }

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.cards}>
                <h1>Veja todas as estruturas cadastradas no site.</h1>
                <div className={css.botoesEstruturas}>
                    <button 
                        type="button" 
                        onClick={() => navigate("/criarEstrutura")}>
                        Criar estrutura
                    </button>
                    <button
                        type="button"
                        onClick={exportar_estruturas_json}
                        style={{ width:"270px" }}> 
                        Exportar estruturas
                    </button>
                    <PermissaoModal 
                        openModal={permissaoModal}
                        closeModal={() => setPermissaoModal(false)}/>
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
                                            navigate("/editarEstrutura");
                                        }}>
                                        Editar
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            localStorage.setItem("idEstrutura", estrutura.id);
                                            setDeletarEstruturaModal(true);
                                        }}>
                                        Deletar
                                    </button>
                                    <DeletarEstruturaModal 
                                        openModal={deletarEstruturaModal}
                                        closeModal={() => setDeletarEstruturaModal(false)}
                                        atualizarCard={get_estruturas}/>
                                </div>
                            </section>
                        ))}
                    </section>
                </section>
            </section>
        </main>
    );
}
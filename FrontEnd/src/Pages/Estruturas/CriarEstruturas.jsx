import css from "./CriarEstruturas.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CriarEstruturasModal } from "../../Components/Modais/Estruturas/CriarEstruturasModal";

const validacaoCriarEstrutura = z.object({
    nome: z.string()
        .min(1, "Digite o nome da estrutura.")
        .max(255, "O nome da estrutura não pode ultrapassar 255 caracteres."),
    dimensao: z.enum([
        "Overworld",
        "Nether",
        "The End",
    ]),
    tipo: z.string()
        .min(1, "Digite o tipo da dimensão.")
        .max(255, "O tipo da dimensão não pode ultrapassar 255 caracteres."),
    tamanho: z.string()
        .min(1, "Digite o tamanho da estrutura.")
        .max(255, "O tamanho da estrutura não pode ultrapassar 255 caracteres."),
    foto: z.string()
        .min(1, "Cole o link da foto."),
}); 

export function CriarEstruturas() {
    const [criarEstruturaModal, setCriarEstruturaModal] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacaoCriarEstrutura)
    });

    async function post_estruturas(data) {
        const dadosEstrutura = {
            ...data,
        }

        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        try {
            await axios.post("http://127.0.0.1:8000/MineLucas/estruturas/", dadosEstrutura, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setCriarEstruturaModal(true);
        }
        catch(error) {
            console.error("Erro ao criar estrutura: ", error.response?.data || error.message);
        } 
    }

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.formularioEstruturas}>
                <h1>Crie sua estrutura aqui!</h1>
                <p className={css.aviso}>Pode ser uma estrutura fictícia ou existente.</p>
                <form onSubmit={handleSubmit(post_estruturas)}>
                    <label 
                        htmlFor="nome"
                        style={{ fontSize:"20px" }}>
                        Nome:
                    </label> <br />
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome"
                        placeholder="Digite o nome da estrutura"
                        {...register("nome")}/>
                    <br />
                    {errors.nome && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.nome.message}</p>}

                    <label 
                        htmlFor="dimensao"
                        style={{ fontSize:"20px" }}>
                        Dimensão:
                    </label> <br />
                    <select 
                        name="dimensao" 
                        id="dimensao"
                        style={{ fontSize:"18px" }}
                        {...register("dimensao")}>
                        <option value="Overworld">Overworld</option>
                        <option value="Nether">Nether</option>
                        <option value="The End">The End</option>
                    </select> <br />
                    {errors.dimensao && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.dimensao.message}</p>}

                    <label 
                        htmlFor="tipo"
                        style={{ fontSize:"20px" }}>
                        Tipo:
                    </label> <br />
                    <input 
                        type="text" 
                        name="tipo" 
                        id="tipo"
                        placeholder="Tipo da estrutura. ex: fortaleza, templo etc."
                        {...register("tipo")}/>
                    <br />
                    {errors.tipo && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.tipo.message}</p>}

                    <label 
                        htmlFor="tamanho"
                        style={{ fontSize:"20px" }}>
                        Tamanho:
                    </label> <br />
                    <input 
                        type="text" 
                        name="tamanho" 
                        id="tamanho"
                        placeholder="Grande, pequeno, médio etc."
                        {...register("tamanho")}/>
                    <br />
                    {errors.tamanho && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.tamanho.message}</p>}

                    <label 
                        htmlFor="foto"
                        style={{ fontSize:"20px" }}>
                        Foto:
                    </label> <br />
                    <input 
                        type="text" 
                        name="foto" 
                        id="foto"
                        placeholder="Cole o link da foto aqui"
                        {...register("foto")}/>
                    <br />
                    {errors.foto && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.foto.message}</p>}

                    <div className={css.botoes}>
                        <button type="submit">Criar</button>
                        <button 
                            type="button"
                            onClick={() => navigate("/estruturas")}>
                            Voltar
                        </button>
                        <CriarEstruturasModal openModal={criarEstruturaModal}/>
                    </div>
                </form>
            </section>
        </main>
    );
}
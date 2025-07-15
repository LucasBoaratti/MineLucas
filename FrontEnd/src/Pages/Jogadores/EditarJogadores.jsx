import css from "./EditarJogadores.module.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { EditarJogadoresModal } from "../../Components/Modais/Jogadores/EditarJogadoresModal";
import axios from "axios";

const validacaoEditarJogador = z.object({
    nome: z.string()
        .min(1, "Digite o nome do jogador.")
        .max(255, "O nome do jogador não pode ter mais de 255 caracteres."),
    biografia: z.string()
        .min(1, "Digite a biografia do jogador."),
    criador_conteudo: z.enum([
        "True",
        "False",
    ]),
    canal: z.string()
        .min(1, "Digite ou cole o link do canal. (se não tiver, digite não)"),
    ativo: z.enum([
        "True",
        "False",
    ]),
    skin: z.string()
        .min(1, "Digite ou cole o link da skin do jogador."),
});

export function EditarJogadores() {
    const [editarJogadoresModal, setEditarJogadoresModal] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacaoEditarJogador)
    });

    async function put_jogadores(data) {
        const dadosJogador = {
            ...data,
        }

        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        const idJogador = localStorage.getItem("idJogador");

        try {
            await axios.put(`http://127.0.0.1:8000/MineLucas/jogadores/${idJogador}/`, dadosJogador, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setEditarJogadoresModal(true);
        }
        catch(error) {
            console.error("Erro ao atualizar jogador: ", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        setValue("nome", localStorage.getItem("nome") || "");
        setValue("biografia", localStorage.getItem("biografia") || "");
        setValue("criador_conteudo", localStorage.getItem("youtuber") || "");
        setValue("canal", localStorage.getItem("canal") || "");
        setValue("ativo", localStorage.getItem("ativo") || "");
        setValue("skin", localStorage.getItem("skin") || "");
    }, []);

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.formularioJogadores}>
                <h1>Edite seu jogador aqui.</h1>
                <p className={css.aviso}>Verifique as informações antes de enviar.</p>
                <form onSubmit={handleSubmit(put_jogadores)}>
                   <label 
                        htmlFor="nome"
                        style={{ fontSize:"20px" }}>
                        Nome:
                    </label> <br />
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        placeholder="Digite o nome do jogador."
                        {...register("nome")} />
                    <br />
                    {errors.nome && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.nome.message}</p>}

                    <label 
                        htmlFor="biografia"
                        style={{ fontSize:"20px" }}>
                        Biografia:
                    </label> <br />
                    <input 
                        type="text" 
                        name="biografia" 
                        id="biografia" 
                        placeholder="Descreva a biografia do jogador"
                        {...register("biografia")} />
                    <br />
                    {errors.biografia && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.biografia.message}</p>}

                    <label 
                        htmlFor="criador_conteudo"
                        style={{ fontSize:"20px" }}>
                        Youtuber:
                    </label> <br />
                    <select 
                        name="criador_conteudo" 
                        id="criador_conteudo"
                        style={{ fontSize:"18px" }}
                        {...register("criador_conteudo")}>
                        <option value="True">True (sim)</option>
                        <option value="False">False (não)</option>
                    </select> <br />
                    {errors.criador_conteudo && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.criador_conteudo.message}</p>}

                    <label 
                        htmlFor="canal"
                        style={{ fontSize:"20px" }}>
                        Canal:
                    </label> <br />
                    <input 
                        type="text"
                        name="canal"
                        id="canal"
                        placeholder="Cole o link do canal. se não tiver, digite não"
                        {...register("canal")} />
                    <br />
                    {errors.canal && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.canal.message}</p>}

                    <label 
                        htmlFor="ativo"
                        style={{ fontSize:"20px" }}>
                        Ativo:
                    </label> <br />
                    <select 
                        name="ativo" 
                        id="ativo"
                        style={{ fontSize:"18px" }}
                        {...register("ativo")}>
                        <option value="True">True (sim)</option>
                        <option value="False">False (não)</option>
                    </select> <br />
                    {errors.ativo && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.ativo.message}</p>}

                    <label 
                        htmlFor="skin"
                        style={{ fontSize:"20px" }}>
                        Foto:
                    </label> <br />
                    <input 
                        type="text"
                        name="skin"
                        id="skin"
                        placeholder="Cole o link da foto/skin"
                        {...register("skin")} />
                    <br />
                    {errors.skin && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.skin.message}</p>}

                    <div className={css.botoes}>
                        <button type="submit">Editar</button>
                        <button 
                            type="button"
                            onClick={() => navigate("/jogadores")}>
                            Voltar
                        </button>
                        <EditarJogadoresModal openModal={editarJogadoresModal}/>
                    </div>
                </form>
            </section>
        </main>
    );
}
import css from "./CriarBlocos.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CriarBlocosModal } from "../../Components/Modais/Blocos/CriarBlocosModal";

const validacaoCriarBloco = z.object({
    nome: z.string()
        .min(1, "Digite um nome.")
        .max(255, "O nome do bloco não pode ser maior que 255 caracteres."),
    textura: z.string()
        .min(1, "Digite uma textura.")
        .max(255, "O tipo de textura não pode ser maior que 255 caracteres."), 
    durabilidade: z.number(),
    brilho: z.enum([
        "True", 
        "False",
    ]),
    inflamavel: z.enum([
        "True", 
        "False",
    ]),
    interagivel: z.enum([
        "True", 
        "False",
    ]),
    altura: z.number(),
    geracao: z.string()
        .min(1, "Digite a geração.")
        .max(255, "A localização da geração não pode ser maior que 255 caracteres."),
    ferramenta_quebra: z.enum([
        "Machado",
        "Picareta",
        "Pá",
        "Enxada",
    ]),
    foto: z.string()
        .min(1, "Cole o link da foto."),
});

export function CriarBlocos() {
    const [criarBlocoModal, setCriarBlocoModal] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacaoCriarBloco)
    });

    async function post_blocos(data) {
        const dadosBloco = {
            ...data,
        }

        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        try {
            await axios.post("http://127.0.0.1:8000/MineLucas/blocos/", dadosBloco, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setCriarBlocoModal(true);
        }
        catch(error) {
            console.error("Erro ao criar bloco: ", error.response?.data || error.message);
        }
    }

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.formularioBlocos}>
                <h1>Crie seu bloco aqui!</h1>
                <p className={css.aviso}>Pode ser um bloco fictício ou existente.</p>
                <form onSubmit={handleSubmit(post_blocos)}>
                    <label 
                        htmlFor="nome"
                        style={{ fontSize:"20px" }}>
                        Nome:
                    </label> <br />
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome"
                        placeholder="Digite o nome do bloco"
                        {...register("nome")} />
                    <br />
                    {errors.nome && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.nome.message}</p>}

                    <label 
                        htmlFor="textura"
                        style={{ fontSize:"20px" }}>
                        Textura:
                    </label> <br />
                    <input 
                        type="text" 
                        name="textura" 
                        id="textura"
                        placeholder="Digite a textura/cor do bloco"
                        {...register("textura")} />
                    <br />
                    {errors.textura && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.textura.message}</p>}

                    <label 
                        htmlFor="durabilidade"
                        style={{ fontSize:"20px" }}>
                        Durabilidade:
                    </label> <br />
                    <input 
                        type="number"
                        step="any" 
                        name="durabilidade" 
                        id="durabilidade"
                        placeholder="Digite a durabilidade total do bloco"
                        {...register("durabilidade", {valueAsNumber:true})} />
                    <br />
                    {errors.durabilidade && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.durabilidade.message}</p>}

                    <label 
                        htmlFor="brilho"
                        style={{ fontSize:"20px" }}>
                        Brilho:
                    </label> <br />
                    <select 
                        name="brilho" 
                        id="brilho"
                        style={{ fontSize:"18px" }}
                        {...register("brilho")}>
                        <option value="True">True (Sim)</option>
                        <option value="False">False (Não)</option>
                    </select> <br />
                    {errors.brilho && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.brilho.message}</p>}

                    <label 
                        htmlFor="inflamavel"
                        style={{ fontSize:"20px" }}>
                        Inflamável:
                    </label> <br />
                    <select 
                        name="inflamavel" 
                        id="inflamavel"
                        style={{ fontSize:"18px" }}
                        {...register("inflamavel")}>
                        <option value="True">True (Sim)</option>
                        <option value="False">False (Não)</option>
                    </select> <br />
                    {errors.inflamavel && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.inflamavel.message}</p>}

                    <label 
                        htmlFor="interagivel"
                        style={{ fontSize:"20px" }}>
                        Interagível:
                    </label> <br />
                    <select 
                        name="interagivel" 
                        id="interagivel"
                        style={{ fontSize:"18px" }}
                        {...register("interagivel")}>
                        <option value="True">True (Sim)</option>
                        <option value="False">False (Não)</option>
                    </select> <br />
                    {errors.interagivel && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.interagivel.message}</p>}

                    <label 
                        htmlFor="altura"
                        style={{ fontSize:"20px" }}>
                        Altura:
                    </label> <br />
                    <input 
                        type="number"
                        step="any" 
                        name="altura" 
                        id="altura"
                        placeholder="Digite a altura total do bloco"
                        {...register("altura", {valueAsNumber:true})} />
                    <br />
                    {errors.altura && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.altura.message}</p>}

                    <label 
                        htmlFor="geracao"
                        style={{ fontSize:"20px" }}>
                        Geração:
                    </label> <br />
                    <input 
                        type="text" 
                        name="geracao" 
                        id="geracao"
                        placeholder="Onde o bloco é gerado"
                        {...register("geracao")} />
                    <br />
                    {errors.geracao && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.geracao.message}</p>}

                    <label 
                        htmlFor="ferramenta"
                        style={{ fontSize:"20px" }}>
                        Ferramenta:
                    </label> <br />
                    <select name="ferramenta" id="ferramenta" style={{ fontSize:"18px" }} {...register("ferramenta_quebra")}>
                        <option value="Machado">Machado</option>
                        <option value="Picareta">Picareta</option>
                        <option value="Pá">Pá</option>
                        <option value="Enxada">Enxada</option>
                    </select>
                    <br />
                    {errors.ferramenta_quebra && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.ferramenta_quebra.message}</p>}

                    <label 
                        htmlFor="foto"
                        style={{ fontSize:"20px" }}>
                        Foto:
                    </label> <br />
                    <input 
                        type="text" 
                        name="foto" 
                        id="foto"
                        placeholder="Cole o link da foto do bloco aqui"
                        {...register("foto")} />
                    <br />
                    {errors.foto && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.foto.message}</p>}

                    <div className={css.botoes}>
                        <button type="submit">Criar</button>
                        <button
                            type="button"
                            onClick={() => navigate("/blocos")}>
                            Voltar
                        </button>
                        <CriarBlocosModal openModal={criarBlocoModal}/>
                    </div>
                </form>
            </section>
        </main>
    );
}
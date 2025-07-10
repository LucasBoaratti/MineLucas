import css from "../Styles/EditarBiomas.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { EditarBiomasModal } from "../../Components/Modais/Biomas/EditarBiomasModal";

const validacaoEditarBioma = z.object({
    nome: z.string()
        .min(1, "Digite o nome do bioma.")
        .max(255, "O nome do bioma não pode ter mais de 255 caracteres."),
    vegetacao: z.string()
        .min(1, "Digite as vegetações que o bioma possui.")
        .max(255, "Desculpe, mas as vegetações do bioma não podem ultrapassar mais de 255 caracteres."),
    clima: z.enum([
        "Frio", 
        "Ameno",       
        "Quente",
    ]),
    chuva: z.enum([
        "True",
        "False",  
    ]),
    dimensao: z.enum([
        "Overworld",
        "Nether",
        "The End",
    ]),
    foto: z.string()
        .min(1, "Cole o link da foto."),
});

export function EditarBiomas() {
    const [modalEditarBioma, setModalEditarBioma] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,   
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacaoEditarBioma)
    });

    async function put_biomas(data) {
        const dadosBioma = {
            ...data,
        }

        const token = localStorage.getItem("access_token");

        const id_bioma = localStorage.getItem("idBioma");

        try {
            await axios.put(`http://127.0.0.1:8000/MineLucas/biomas/${id_bioma}/`, dadosBioma, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setModalEditarBioma(true);
        }
        catch(error) {
            console.error("Erro ao editar bioma: ", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        setValue("nome", localStorage.getItem("nome") || "");
        setValue("vegetacao", localStorage.getItem("vegetacao") || "");
        setValue("clima", localStorage.getItem("clima") || "ameno");
        setValue("chuva", localStorage.getItem("chuva") || "false");
        setValue("dimensao", localStorage.getItem("dimensao") || "overworld");
        setValue("foto", localStorage.getItem("foto") || "");
    }, []);

    return (
        <main className={css.biomaContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.formularioBiomas}>
                <h1>Edite seu bioma aqui!</h1>
                <p className={css.aviso}>Verifique as informações antes de enviar.</p>
                <form onSubmit={handleSubmit(put_biomas)}>
                    <label 
                        htmlFor="name"
                        style={{ fontSize:"20px" }}>
                        Nome:
                    </label> <br />
                    <input 
                        type="text" 
                        name="name" 
                        id="nome"
                        placeholder="Nome do bioma" 
                        {...register("nome")}/>
                    <br />
                    {errors.nome && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.nome.message}</p>}
    
                    <label 
                        htmlFor="vegetacao"
                        style={{ fontSize:"20px" }}>
                        Vegetação:
                        </label> <br />
                    <input 
                        type="text"
                        name="vegetacao" 
                        id="vegetacao" 
                        placeholder="Quais plantas o bioma possui"
                        {...register("vegetacao")}/>
                    <br />
                    {errors.vegetacao && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.vegetacao.message}</p>}
    
                    <label 
                        htmlFor="clima"
                        style={{ fontSize:"20px" }}>
                        Clima:
                    </label> <br />
                    <select 
                        name="clima" 
                        id="clima"
                        style={{ fontSize:"18px" }}
                        {...register("clima")}>
                        <option value="Frio">Frio</option>
                        <option value="Ameno">Ameno</option>
                        <option value="Quente">Quente</option>
                    </select>
                    <br />
                    {errors.clima && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.clima.message}</p>}
    
                    <label 
                        htmlFor="chuva"
                        style={{ fontSize:"20px" }}>
                        Chuva:
                    </label> <br />
                    <select 
                        name="chuva" 
                        id="chuva"
                        style={{ fontSize:"18px" }}
                        {...register("chuva")}>
                        <option value="True">True (Sim)</option>
                        <option value="False">False (Não)</option>
                    </select> 
                    <br />
                    {errors.chuva && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.chuva.message}</p>}
    
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
                    </select>
                    <br />
                    {errors.dimensao && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.dimensao.message}</p>}
    
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
    
                    <div className={css.botao}>
                        <button type="submit">Editar bioma</button>
                    </div>
                    <EditarBiomasModal openModal={modalEditarBioma}/>
                </form>
            </section>
        </main>
    );
}
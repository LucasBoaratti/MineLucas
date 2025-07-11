import css from "./CriarBiomas.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CriarBiomasModal } from "../../Components/Modais/Biomas/CriarBiomasModal";

const validacaoCriarBioma = z.object({
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

export function CriarBiomas() {
     const [modalCriarBioma, setModalCriarBioma] = useState(false);

     const navigate = useNavigate();

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm({
          resolver: zodResolver(validacaoCriarBioma)
     });

     async function post_biomas(data) {
          const dadosBioma = {
               ...data,
          }

          const token = localStorage.getItem("access_token");

          try {
               await axios.post("http://127.0.0.1:8000/MineLucas/biomas/", dadosBioma, {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json",
                    },
               });

               setModalCriarBioma(true);
          }
          catch(error) {
               console.error("Erro ao criar bioma: ", error.response?.data || error.message);
          }
     }

     return (
          <main className={css.biomaContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.formularioBiomas}>
                    <h1>Crie seu bioma aqui!</h1>
                    <p>Pode ser um bioma existente ou fictício.</p>
                    <form onSubmit={handleSubmit(post_biomas)}>
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

                         <div className={css.botoes}>
                              <button type="submit">Criar bioma</button>
                              <button
                                   type="button"
                                   onClick={() => navigate("/biomas")}>
                                   Voltar
                              </button>
                         </div>
                         <CriarBiomasModal openModal={modalCriarBioma}/>
                    </form>
               </section>
          </main>
     );
}
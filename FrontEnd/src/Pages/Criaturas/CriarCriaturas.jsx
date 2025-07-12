import css from "./CriarCriaturas.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CriarCriaturasModal } from "../../Components/Modais/Criaturas/CriarCriaturasModal";

const validacaoCriarCriatura = z.object({
     nome: z.string()
          .min(1, "Digite o nome da criatura.")
          .max(255, "O nome da criatura não pode ultrapassar 255 caracteres."),
     tipo: z.string()
          .min(1, "Digite o tipo do mob.")
          .max(255, "O tipo do mob não pode ultrapassar 255 caracteres."),
     tamanho: z.number(),
     vida: z.number(),
     drop_itens: z.string()
          .min(1, "Digite os drops de itens do mob."),
     habilidade_especial: z.enum([
          "True", 
          "False",
     ]),
     montado: z.enum([
          "True", 
          "False",
     ]),
     dimensao_criatura: z.enum([
          "Overworld", 
          "Nether", 
          "The End",
     ]),
     foto: z.string()
          .min(1, "Cole o link da foto."),
});

export function CriarCriaturas() {
     const [criarCriaturaModal, setCriarCriaturaModal] = useState(false);

     const navigate = useNavigate();

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm({
          resolver: zodResolver(validacaoCriarCriatura)
     });

     async function post_criaturas(data) {
          const dadosCriatura = {
               ...data,
          };

          const token = localStorage.getItem("access_token");

          try {
               await axios.post("http://127.0.0.1:8000/MineLucas/criaturas/", dadosCriatura, {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json",
                    },
               });

               setCriarCriaturaModal(true);
          }
          catch(error) {
               console.error("Erro ao criar criatura: ", error.response?.data || error.message);
          }
     }

     return (
          <main className={css.criaturaContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.formularioCriaturas}>
                    <h1>Crie sua criatura aqui!</h1>
                    <p className={css.aviso}>Pode ser uma criatura fictícia ou existente.</p>
                    <form onSubmit={handleSubmit(post_criaturas)}>
                         <label 
                              htmlFor="nome"
                              style={{ fontSize:"20px" }}>
                              Nome:
                         </label> <br />
                         <input 
                              type="text" 
                              name="nome" 
                              id="nome"
                              placeholder="Digite o nome da criatura"
                              {...register("nome")} />
                         <br />
                         {errors.nome && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.nome.message}</p>}

                         <label 
                              htmlFor="tipo"
                              style={{ fontSize:"20px" }}>
                              Tipo:
                         </label> <br />
                         <input 
                              type="text" 
                              name="tipo" 
                              id="tipo"
                              placeholder="Ex: passivo, hostil ou neutro"
                              {...register("tipo")} />
                         <br />
                         {errors.tipo && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.tipo.message}</p>}

                         <label 
                              htmlFor="tamanho"
                              style={{ fontSize:"20px" }}>
                              Tamanho:
                         </label> <br />
                         <input 
                              type="number" 
                              name="tamanho" 
                              id="tamanho"
                              placeholder="Digite o tamanho do mob em blocos"
                              {...register("tamanho", {valueAsNumber:true})} />
                         <br />
                         {errors.tamanho && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.tamanho.message}</p>}

                         <label 
                              htmlFor="vida"
                              style={{ fontSize:"20px" }}>
                              Vida:
                         </label> <br />
                         <input 
                              type="number" 
                              name="vida" 
                              id="vida"
                              placeholder="Digite a vida do mob"
                              {...register("vida", {valueAsNumber:true})} />
                         <br />
                         {errors.vida && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.vida.message}</p>}

                         <label 
                              htmlFor="drops"
                              style={{ fontSize:"20px" }}>
                              Drops:
                         </label> <br />
                         <input 
                              type="text" 
                              name="drops" 
                              id="drops"
                              placeholder="Drops do mob após a morte"
                              {...register("drop_itens")} />
                         <br />
                         {errors.drop_itens && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.drop_itens.message}</p>}

                         <label 
                              htmlFor="habilidadeEspecial"
                              style={{ fontSize:"20px" }}>
                              Habilidade(s) especial(is):
                         </label> <br />
                         <select 
                              name="habilidadeEspecial" 
                              id="habilidadeEspecial"
                              style={{ fontSize:"18px" }}
                              {...register("habilidade_especial")}>
                                   <option value="True">True (Sim)</option>
                                   <option value="False">False (Não)</option>
                         </select> <br />
                         {errors.habilidade_especial && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.habilidade_especial.message}</p>}

                         <label 
                              htmlFor="montado"
                              style={{ fontSize:"20px" }}>
                              Montável:
                         </label> <br />
                         <select 
                              name="montado" 
                              id="montado" 
                              style={{ fontSize:"18px" }}
                              {...register("montado")}>
                              <option value="True">True (Sim)</option>
                              <option value="False">False (Não)</option>
                         </select> <br />
                         {errors.montado && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.montado.message}</p>}

                         <label 
                              htmlFor="dimensao_criatura"
                              style={{ fontSize:"20px" }}>
                              Dimensão:
                         </label> <br />
                         <select 
                              name="dimensao_criatura" 
                              id="dimensao_criatura"
                              style={{ fontSize:"18px" }}
                              {...register("dimensao_criatura")}>
                              <option value="Overworld">Overworld</option>
                              <option value="Nether">Nether</option>
                              <option value="The End">The End</option>          
                         </select> <br />
                         {errors.dimensao_criatura && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.dimensao_criatura.message}</p>}

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
                              {...register("foto")} />
                         <br />
                         {errors.foto && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.foto.message}</p>}

                         <div className={css.botoes}>
                              <button type="submit">Criar</button>
                              <button 
                                   type="button"
                                   onClick={() => navigate("/criaturas")}>
                                   Voltar
                              </button>
                         </div>
                         <CriarCriaturasModal openModal={criarCriaturaModal}/>
                    </form>
               </section>
          </main>
     );
}
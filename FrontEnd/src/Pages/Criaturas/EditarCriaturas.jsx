import { useState } from "react";
import css from "./EditarCriaturas.module.css";
import axios from "axios";
import { EditarCriaturasModal } from "../../Components/Modais/Criaturas/EditarCriaturasModal";

const validacaoEditarCriatura = z.object({
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
     habilidade_especial: z.enum(["True", "False"]),
     montado: z.enum(["True", "False"]),
     dimensao_criatura: z.enum(["Overworld", "Nether", "The End"]),
     foto: z.string()
          .min(1, "Cole o link da foto."),
});

export function EditarCriaturas() {
     const [editarCriaturaModal, setEditarCriaturaModal] = useState(false);

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm({
          resolver: zodResolver(validacaoEditarCriatura)
     });

     async function put_criaturas(data) {
          const dadosCriaturas = {
               ...data,
          };

          const token = localStorage.getItem("access_token");

          const id_criatura = localStorage.getItem("idCriatura");

          try {
               await axios.put(`http://127.0.0.1:8000/MineLucas/criaturas/${id_criatura}`, dadosCriaturas, {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-type": "application/json",
                    },
               });

               setEditarCriaturaModal(true);
          }
          catch(error) {
               console.error("Erro ao atualizar a criatura: ", error.response?.data || error.message);
          }
     }

     return (
          <main className={css.criaturaContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.formularioCriaturas}>
                    <h1>Edite sua criatura aqui.</h1>
                    <p className={css.aviso}>Verique as informações antes de enviar.</p>
                    <form onSubmit={handleSubmit(put_criaturas)}>
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
                              placeholder="Digite o tamanho do mob"
                              {...register("tamanho")} />
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
                              {...register("vida")} />
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
                         </select>
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

                         <div className={css.botao}>
                              <button type="submit">Criar</button>
                         </div>
                         <EditarCriaturasModal openModal={editarCriaturaModal}/>
                    </form>
               </section>
          </main>
     );
}
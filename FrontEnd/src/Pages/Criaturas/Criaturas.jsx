import css from "./Criaturas.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeletarCriaturaModal } from "../../Components/Modais/Criaturas/DeletarCriaturaModal";
import { PermissaoModal } from "../../Components/Modais/Permissoes/PermissaoModal";

export function Criaturas() {
     const [criaturas, setCriaturas] = useState([]);
     const [deletarCriaturaModal, setDeletarCriaturaModal] = useState(false);
     const [permissaoModal, setPermissaoModal] = useState(false);

     const navigate = useNavigate();

     async function get_criaturas() {
          const token = localStorage.getItem("access_token");

          if(!token) {
               console.error("Token não encontrado.");
          }

          try {
               const response = await axios.get("http://127.0.0.1:8000/MineLucas/criaturas/", {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json",
                    },
               });

               setCriaturas(response.data);
          }
          catch(error) {
               console.error("Erro ao obter dados das criaturas: ", error.response?.data || error.message);
          }
     }

     useEffect(() => {
          get_criaturas();
     }, []);

     function exportar_criaturas_json() {
          const token = localStorage.getItem("access_token");

          axios.get("http://127.0.0.1:8000/MineLucas/exportarCriaturas/", {
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

               links.download = "Criaturas_data.json";

               links.click();

               URL.revokeObjectURL(url);   
          })
          .catch((error) => {
               console.error("Erro ao exportar as criaturas: ", error.response?.data || error.message);

               if(error.response && (error.response.status === 403 || error.response.status === 401)) {
                    setPermissaoModal(true);

                    return;
               }
          });
     }

     return (
          <main className={css.cardsContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.cards}>
                    <h1>Veja todas as criaturas cadastradas no site.</h1>
                    <div className={css.botoesCriaturas}>
                         <button 
                              type="button" 
                              onClick={() => navigate("/criarCriatura")}>
                              Criar criatura
                         </button>
                         <button
                              type="button"
                              onClick={exportar_criaturas_json}
                              style={{ width:"250px" }}> 
                              Exportar criaturas
                         </button>
                         <PermissaoModal 
                              openModal={permissaoModal}
                              closeModal={() => setPermissaoModal(false)}/>
                    </div>
                    <section className={css.criaturas}>
                         <section className={css.fileiraCards}>
                              {criaturas.map((criatura, id) => (
                                   <section key={id} className={css.cardCriatura}>
                                        <div className={css.imagem}>
                                             <img 
                                                  src={criatura.foto} 
                                                  alt="Imagem da criatura/entidade." />
                                        </div>
                                        <h2>Nome: {criatura.nome}</h2>
                                        <p>Tipo: {criatura.tipo}</p>
                                        <p>Tamanho: {criatura.tamanho}</p>
                                        <p>Vida: {criatura.vida}</p>
                                        <p>Drops: {criatura.drop_itens}</p>
                                        <p>Habilidade especial: {criatura.habilidade_especial ? "Sim" : "Não"}</p>
                                        <p>Montável: {criatura.montado ? "Sim" : "Não"}</p>
                                        <p>Dimensão: {criatura.dimensao_criatura}</p>
                                        <div className={css.botoes}>
                                             <button 
                                                  type="button"
                                                  onClick={() => {
                                                       localStorage.setItem("idCriatura", criatura.id);
                                                       localStorage.setItem("nome", criatura.nome);
                                                       localStorage.setItem("tipo", criatura.tipo);
                                                       localStorage.setItem("tamanho", criatura.tamanho);
                                                       localStorage.setItem("vida", criatura.vida);
                                                       localStorage.setItem("drop_itens", criatura.drop_itens);
                                                       localStorage.setItem("habilidadeEspecial", criatura.habilidade_especial.toString());
                                                       localStorage.setItem("montavel", criatura.montado.toString());
                                                       localStorage.setItem("dimensao", criatura.dimensao_criatura);
                                                       localStorage.setItem("foto", criatura.foto);
                                                       navigate("/editarCriatura");
                                                  }}>
                                                  Editar
                                             </button>
                                             <button 
                                                  type="button"
                                                  onClick={() => {
                                                       localStorage.setItem("idCriatura", criatura.id);
                                                       setDeletarCriaturaModal(true);
                                                  }}>
                                                  Excluir
                                             </button>
                                             <DeletarCriaturaModal 
                                                  openModal={deletarCriaturaModal}
                                                  closeModal={() => setDeletarCriaturaModal(false)}
                                                  atualizarCard={get_criaturas}/>
                                        </div>
                                   </section>
                              ))}
                         </section>
                    </section>
               </section>
          </main>
     );
}
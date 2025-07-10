import css from "./Criaturas.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Criaturas() {
     const [criaturas, setCriaturas] = useState([]);
     const [idCriatura, setIdCriatura] = useState(null);
     const [deletarCriaturaModal, setDeletarCriaturaModal] = useState(false);

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

     return (
          <main className={css.cardsContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.cards}>
                    <h1>Veja todas as criaturas cadastradas no site.</h1>
                    <div className={css.criarCriatura}>
                         <button 
                              type="button"
                              onClick={() => navigate("/criarCriatura")}>
                              Criar criatura
                         </button>
                    </div>
                    <section className={css.criaturas}>
                         <section className={css.fileiraCards}>
                              {criaturas.map((criatura, id) => (
                                   <section key={id} className={css.cardCriatura}>
                                        <img 
                                             src={criatura.foto} 
                                             alt="Imagem da criatura/entidade." />
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
                                                       localStorage.setItem("drops", criatura.drop_itens);
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
                                        </div>
                                   </section>
                              ))}
                         </section>
                    </section>
               </section>
          </main>
     );
}
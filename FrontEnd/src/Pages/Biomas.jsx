import css from "../Styles/Biomas.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Biomas() {
     const [biomas, setBiomas] = useState([]);
     const [idBioma, setIdBioma] = useState(null);
     const [deletarBioma, setDeletarBioma] = useState(false);

     const navigate = useNavigate();

     async function get_biomas() {
          const token = localStorage.getItem("access_token");

          if(!token) {
               console.log("Token não encontrado.");
          }

          try {
               const response = await axios.get("http://127.0.0.1:8000/MineLucas/biomas/",{
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Conteny-Type": "application/json",
                    },
               });

               setBiomas(response.data);
          }
          catch(error) {
               console.error("Erro ao obter bioma: ", error.response?.data || error.message);
          }
     }

     useEffect(() => {
          get_biomas();
     }, []);

     return (
          <main className={css.cardsContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.cards}>
                    <h1>Veja todos os biomas cadastrados no site.</h1>
                    <section className={css.biomas}>
                         <section className={css.fileiraCards}>
                              {biomas.map((bioma, id) => (
                                   <section key={id} className={css.cardBioma}>
                                        <img src={bioma.foto} alt="Imagem do bioma." />
                                        <h2>Nome: {bioma.nome}</h2>
                                        <p>Vegetação: {bioma.vegetacao}</p>
                                        <p>Clima: {bioma.clima}</p>
                                        <p>Chuva: {bioma.chuva ? "Sim" : "Não"}</p>
                                        <p>Dimensão: {bioma.dimensao}</p>
                                        <div className={css.botoes}>
                                             <button 
                                                  type="button" 
                                                  onClick={() => {
                                                       localStorage.setItem("idBioma", bioma.id);
                                                       localStorage.setItem("nome", bioma.nome);
                                                       localStorage.setItem("vegetacao", bioma.vegetacao);
                                                       localStorage.setItem("clima", bioma.clima);
                                                       localStorage.setItem("chuva", bioma.chuva.toString());
                                                       localStorage.setItem("dimensao", bioma.dimensao);
                                                       localStorage.setItem("foto", bioma.foto);
                                                       navigate("/editarBioma");
                                                  }}>
                                                  Editar
                                             </button>
                                             <button 
                                                  type="button"
                                                  onClick={() => {
                                                       setIdBioma(bioma.id);
                                                       setDeletarBioma(true);
                                                  }}>
                                                  Excluir
                                             </button>
                                        </div>
                                   </section>
                              ))};
                         </section>
                    </section>
               </section>
          </main>
     );   
}
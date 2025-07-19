import css from "./Biomas.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeletarBiomaModal } from "../../Components/Modais/Biomas/DeletarBiomaModal";
import { PermissaoModal } from "../../Components/Modais/Permissoes/PermissaoModal";

export function Biomas() {
     const [biomas, setBiomas] = useState([]);
     const [deletarBioma, setDeletarBioma] = useState(false);
     const [permissaoModal, setPermissaoModal] = useState(false);

     const navigate = useNavigate();

     async function get_biomas() {
          const token = localStorage.getItem("access_token");

          if(!token) {
               console.log("Token não encontrado.");
          }

          try {
               const response = await axios.get("http://127.0.0.1:8000/MineLucas/biomas/", {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json",
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

     function exportar_biomas_json() {
          const token = localStorage.getItem("access_token");

          axios.get("http://127.0.0.1:8000/MineLucas/exportarBiomas/", {
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

               links.download = "Biomas_data.json";

               links.click();

               URL.revokeObjectURL(url);   
          })
          .catch((error) => {
               console.error("Erro ao exportar os biomas: ", error.response?.data || error.message);

               if(error.response && (error.response.status === 403 || error.response.status === 401)) {
                    setPermissaoModal(true);

                    return;
               }
          });
     }

     return (
          <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
               <section className={css.cards}>
                    <h1>Veja todos os biomas cadastrados no site</h1>
                    <div className={css.botoesBiomas}>
                         <button 
                              type="button" 
                              onClick={() => navigate("/criarBioma")}>
                              Criar bioma
                         </button>
                         <button
                              type="button"
                              onClick={exportar_biomas_json}
                              style={{ width:"220px" }}> 
                              Exportar biomas
                         </button>
                         <PermissaoModal 
                              openModal={permissaoModal}
                              closeModal={() => setPermissaoModal(false)}/>
                    </div>
                    <section className={css.biomas}>
                         <section className={css.fileiraCards}>
                              {biomas.map((bioma, id) => (
                                   <section key={id} className={css.cardBioma}>
                                        <div className={css.imagem}>
                                             <img 
                                                  src={bioma.foto} 
                                                  alt="Imagem do bioma." />
                                        </div>
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
                                                       localStorage.setItem("idBioma", bioma.id);
                                                       setDeletarBioma(true);
                                                  }}>
                                                  Excluir
                                             </button>
                                             <DeletarBiomaModal 
                                                  openModal={deletarBioma}
                                                  closeModal={() => setDeletarBioma(false)}
                                                  atualizarCard={get_biomas}/>
                                        </div>
                                   </section>
                              ))}
                         </section>
                    </section>
               </section>
          </main>
     );   
}
export function CriarBiomas() {
     return (
          <main>
               <section>
                    <h1>Crie seu bioma aqui!</h1>
                    <p>Pode ser um bioma existente ou fictício.</p>
                    <form>
                         <label htmlFor="name">Nome:</label> <br />
                         <input 
                              type="text" 
                              name="name" 
                              id="nome"
                              placeholder="Nome do bioma" />
                         <br />

                         <label htmlFor="vegetacao">Vegetação:</label> <br />
                         <input 
                              type="text"
                              name="vegetacao" 
                              id="vegetacao" 
                              placeholder="Quais plantas o bioma possui?"/>
                         <br />

                         <label htmlFor="clima">Clima:</label> <br />
                         <select 
                              name="clima" 
                              id="clima">
                              <option value="Frio">Frio</option>
                              <option value="Ameno">Ameno</option>
                              <option value="Quente">Quente</option>
                         </select>
                         <br />

                         <label htmlFor="chuva">Chuva:</label> <br />
                         <select name="chuva" id="chuva">
                              <option value="True">True (Sim)</option>
                              <option value="False">False (Não)</option>
                         </select> 
                         <br />

                         <label htmlFor="dimensao"></label> <br />
                    </form>
               </section>
          </main>
     );
}
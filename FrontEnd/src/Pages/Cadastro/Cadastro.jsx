import css from "./Cadastro.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CadastroModalSucesso } from "../../Components/Modais/Cadastro/CadastroModalSucesso";

const validacaoCadastro = z.object({
     username: z.string()
          .min(1, "Digite seu nome.")
          .max(255, "O nome não pode passar de 255 caracteres."),
     email: z.string()
          .min(1, "Digite seu e-mail.")
          .max(255, "O e-mail não pode ultrapassar de 255 caracteres."),
     password: z.string()
          .min(8, "A senha tem que possuir no mínimo 8 caracteres."),
     confirmarSenha: z.string()
          .min(8, "A senha tem que possuir no mínimo 8 caracteres."),
     funcao: z.enum(["Jogador"]),
}).refine((data) => data.password === data.confirmarSenha, {
     message: "As senhas estão diferentes. Tente novamente.",
     path: ["confirmarSenha"],
});

export function Cadastro() {
     const [modalCadastro, setModalCadastro] = useState(false);

     const navigate = useNavigate();

     const {
          register,
          handleSubmit, 
          formState: { errors },
     } = useForm({
          resolver: zodResolver(validacaoCadastro)
     });

     async function cadastro(data) {
          const dadosCadastro = {
               ...data,
          }

          try {
               await axios.post("http://127.0.0.1:8000/MineLucas/cadastro/", dadosCadastro);

               setModalCadastro(true);
          }
          catch(error) {
               console.error("Erro ao realizar o cadastro: ", error.response?.data || error.message);
          }
     }

     return (
          <main className={css.cadastroContainer}>
               <section className={css.cadastro}>
                    <h1>Realize seu cadastro!</h1>
                    <p className={css.realizarCadastro}>Crie sua conta para usar no site.</p>
                    <form onSubmit={handleSubmit(cadastro)}>
                         <label htmlFor="nome">Nome:</label> <br />
                         <input 
                              type="text" 
                              name="nome" 
                              id="nome" 
                              placeholder="Digite seu nome"
                              {...register("username")} />
                         <br />
                         {errors.username && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.username.message}</p>}

                         <label htmlFor="email">E-Mail:</label> <br />
                         <input 
                              type="email" 
                              name="email" 
                              id="email"
                              placeholder="Digite seu email"
                              {...register("email")} /> 
                         <br />
                         {errors.email && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.email.message}</p>}

                         <label htmlFor="password">Senha:</label> <br />
                         <input 
                              type="password" 
                              name="password" 
                              id="password"
                              placeholder="Digite sua senha"
                              {...register("password")} />
                         <br />
                         {errors.password && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.password.message}</p>}

                         <label htmlFor="confirmarSenha">Confirmar senha:</label> <br />
                         <input 
                              type="password" 
                              name="confirmarSenha" 
                              id="confirmarSenha"
                              placeholder="Confirme sua senha"
                              {...register("confirmarSenha")} />
                         <br />
                         {errors.confirmarSenha && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.confirmarSenha.message}</p>}

                         <label htmlFor="funcao">Função:</label> 
                         <select 
                              name="funcao" 
                              id="funcao"
                              {...register("funcao")}>
                              <option value="Jogador">Jogador</option>
                         </select>
                         {errors.funcao && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.funcao.message}</p>}

                         <p className={css.login}>Já possui uma conta? Faça seu login <u onClick={() => navigate("/")}>aqui!</u></p>

                         <div className={css.botao}>
                              <button type="submit">Criar</button>
                         </div>
                         <CadastroModalSucesso openModal={modalCadastro}/>
                    </form>
               </section>
          </main>
     );
}
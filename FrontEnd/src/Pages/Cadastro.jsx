import css from "../Styles/Cadastro.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
     const [cadastro, setCadastro] = useState(false);
     const [erroCadastro, setErroCadastro] = useState(false);

     const {
          register,
          handleSubmit, 
          formState: { errors },
     } = useForm({
          resolver: zodResolver(validacaoCadastro)
     });

     return (
          <main className={css.cadastroContainer}>
               <section className={css.cadastro}>
                    <h1>Realize seu cadastro!</h1>
                    <p className={css.realizarCadastro}>Crie sua conta para usar no site.</p>
                    <form>
                         <label htmlFor="nome">Nome:</label> <br />
                         <input 
                              type="text" 
                              name="nome" 
                              id="nome" 
                              placeholder="Digite seu nome" />
                         <br />

                         <label htmlFor="email">E-Mail:</label> <br />
                         <input 
                              type="email" 
                              name="email" 
                              id="email"
                              placeholder="Digite seu email" /> 
                         <br />

                         <label htmlFor="password">Senha:</label> <br />
                         <input 
                              type="password" 
                              name="password" 
                              id="password"
                              placeholder="Digite sua senha" />
                         <br />

                         <label htmlFor="confirmarSenha">Confirmar senha:</label> <br />
                         <input 
                              type="password" 
                              name="confirmarSenha" 
                              id="confirmarSenha"
                              placeholder="Confirme sua senha" />
                         <br />

                         <select 
                              name="funcao" 
                              id="funcao">
                              <option value="jogador">Jogador</option>
                         </select>

                         <p className={css.login}>Já possui uma conta? Faça seu login <u>aqui!</u></p>

                         <div className={css.botao}>
                              <button type="button">Criar</button>
                         </div>
                    </form>
               </section>
          </main>
     );
}
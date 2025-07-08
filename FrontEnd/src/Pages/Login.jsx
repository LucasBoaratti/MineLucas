import css from "../Styles/Login.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginModalSucesso } from "../Components/LoginModalSucesso";
import { LoginModalFracasso } from "../Components/LoginModalFracasso";

const validacaoLogin = z.object({
    username: z.string()
        .min(1, "Digite seu nome.")
        .max(255, "O nome não pode ter mais de 255 caracteres."),
    password: z.string()
        .min(8, "A senha tem que possuir no mínimo 8 caracteres."),
})

export function Login() {
    const [loginModal, setLoginModal] = useState(false);
    const [erroLoginModal, setErroLoginModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(validacaoLogin)
    });

    async function login(data) {
        const dadosLogin = {
            ...data,
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/MineLucas/login/", dadosLogin);

            const { access, refresh, usuario } = response.data;

            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("nomeUsuario", usuario.Nome);
            localStorage.setItem("funcaoUsuario", usuario.Função);

            setLoginModal(true);
        }
        catch(error) {
            console.error("Erro ao realizar o login: ", error.response?.data || error.message);

            setErroLoginModal(true);
        }
    }

    return (
        <main className={css.loginContainer}>
            <section className={css.login}>
                <h1>Bem vindo(a) à MineLucas!</h1>
                <p className={css.realizarLogin}>Realize seu login abaixo.</p>
                <form onSubmit={handleSubmit(login)}>
                    <label 
                        htmlFor="name"
                        style={{ fontSize:"20px" }}>
                        Nome:
                    </label> <br />
                    <input 
                        type="text" 
                        name="name" 
                        id="nome" 
                        placeholder="Digite seu nome"
                        {...register("username")} /> 
                    <br />
                    {errors.username && <p style={{ marginBottom:"5px", color:"#59331B" }}>{errors.username.message}</p>}

                    <label 
                        htmlFor="password"
                        style={{ fontSize:"20px" }}>
                        Senha:
                    </label> <br />
                    <input 
                        type="password" 
                        name="password" 
                        id="senha" 
                        placeholder="Digite sua senha"
                        {...register("password")} /> 
                    <br />
                    {errors.password && <p style={{ marginBottom:"10px", color:"#59331B" }}>{errors.password.message}</p>}

                    <p className={css.cadastro}>Ainda não possui uma conta? Faça seu cadastro <u>aqui</u></p>

                    <div className={css.botao}>
                        <button type="submit">Entrar</button>
                    </div>
                    <LoginModalSucesso openModal={loginModal}/>
                    <LoginModalFracasso 
                        openModal={erroLoginModal} 
                        closeModal={() => setErroLoginModal(false)}/>
                </form>
            </section>
        </main>
    );
}
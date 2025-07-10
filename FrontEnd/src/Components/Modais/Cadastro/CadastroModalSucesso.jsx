import css from "./CadastroModalSucesso.module.css";
import { useNavigate } from "react-router-dom";

export function CadastroModalSucesso({ openModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer}>
            <section className={css.modalCadastro}>
                <h1>Cadastro realizado com sucesso! Realize o login.</h1>
                    <div className={css.botao}>
                        <button 
                            type="button"
                            onClick={() => navigate("/")}>
                            Avançar
                        </button>
                    </div>
            </section>
        </main>
    );
}
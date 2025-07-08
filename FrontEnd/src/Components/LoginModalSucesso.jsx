import { useNavigate } from "react-router-dom";
import css from "../Styles/LoginModalSucesso.module.css";

export function LoginModalSucesso({ openModal }) {
    if (!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer}>
            <section className={css.modalLogin}>
                <h1>Login realizado com sucesso!</h1>
                <div className={css.botao}>
                    <button 
                        type="button"
                        onClick={() => navigate("/home")}>
                        Avançar
                    </button>
                </div>
            </section>
        </main>
    );
}
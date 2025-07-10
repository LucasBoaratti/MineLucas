import { useNavigate } from "react-router-dom";
import css from "./LoginModalSucesso.module.css";

export function LoginModalSucesso({ openModal }) {
    if (!openModal) {
        return null;
    }

    const navigate = useNavigate();

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
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
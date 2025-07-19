import css from "./PermissaoModal.module.css";

export function PermissaoModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    return (
        <main className={css.modalContainer} style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.modalPermissao}>
                <p>Ops! você não ter permissão para realizar o download. :(</p>
                <div className={css.botao}>
                    <button 
                        type="button"
                        onClick={closeModal}>
                        Voltar
                    </button>
                </div>
            </section>
        </main>
    );
}
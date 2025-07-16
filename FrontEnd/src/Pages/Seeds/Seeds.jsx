import css from "./Seeds.module.css";
import axios from "axios";
import { useState, useRef } from "react";

export function Seeds() {
    const escolherSeed = useRef(null);

    function copiarSeed() {
        if(escolherSeed.current) {
            const selecionarTexto = escolherSeed.current.innerText;

            navigator.clipboard.writeText(selecionarTexto)

            .then(() => {
                alert("Seed copiada! Teste o CTRL + V no seu computador.");
            })
            .catch((error) => {
                console.error("Erro ao copiar seed: ", error);
            });
        }
    }

    const [seeds, setSeeds] = useState(null);
    const [seedGerada, setSeedGerada] = useState(false);

    async function get_seeds() {
        const token = localStorage.getItem("access_token");

        if(!token) {
            console.log("Token não encontrado.");
        }

        try {
            const response = await axios.get("http://127.0.0.1:8000/MineLucas/seed/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setSeeds(response.data.seed);
            setSeedGerada(true);
        }
        catch(error) {
            console.error("Erro ao gerar seed: ", error.response?.data || error.message);
        }
    }

    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.seeds}>
                <h1>Gerador de seeds!</h1>
                <p className={css.geradorSeed}>Gere uma seed aqui para usar em seu mundo!</p>
                {seedGerada && seeds && ( 
                    <div className={css.seed}>
                        <p ref={escolherSeed}>{seeds}</p>
                        <button
                            type="button"
                            onClick={copiarSeed}>
                            Copiar seed
                        </button>
                    </div>
                )}
                <div className={css.botao}>
                    <button 
                        type="button"
                        onClick={get_seeds}>
                        Gerar
                    </button>
                </div>
            </section>
        </main>
    );
}
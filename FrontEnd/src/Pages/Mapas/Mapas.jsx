import MapaRepetente from "../../assets/Images/Imagens_Mapas/MapaRepetente.png";
import MonumentoStronghold from "../../assets/Images/Imagens_Mapas/MonumentoStronghold.png";
import VilaBugada from "../../assets/Images/Imagens_Mapas/VilaBugada.png";
import PortalBugado from "../../assets/Images/Imagens_Mapas/PortalBugado.png";
import IgluBugado from "../../assets/Images/Imagens_Mapas/IgluBugado.png";
import css from "./Mapas.module.css";

export function Mapas() {
    return (
        <main style={{ backgroundColor:'rgba(0, 0, 0, 0.5)', backgroundBlendMode:'darken' }}>
            <section className={css.mapas}>
                <h1 className={css.titulo}>Conheça os melhores e mais confusos mapas no Minecraft!</h1>
                <section className={css.mapaRepetente}>
                    <div className={css.imagens}>
                        <img src={MapaRepetente} alt="Mapa repetente." />
                    </div>
                    <div className={css.informacoes}>
                        <h2>Mapa bugado que repete cavernas</h2>
                        <p style={{ marginBottom:"20px" }}>Seed: 164311266871034</p>
                        <p style={{ marginBottom:"20px" }}>Versões: 1.21.7 para baixo</p>
                        <p style={{ textAlign:"justify" }}>Descrição: Mapa que fica repetindo cavernas ao longo do eixo Z, sim é isso mesmo, a maioria das cavernas ficam repetindo até o infinito, mas não é apenas cavernas não e sim, as minas (mineshaft) também repetem infinitamente ao longo do eixo Z, assim como as cavernas.</p>
                    </div>
                </section>
                <section className={css.mapaBugado}>
                    <div className={css.imagens}>
                        <img src={MonumentoStronghold} alt="Templo aquático e Stronghold bugadas." />
                    </div>
                    <div className={css.informacoes}>
                        <h2>Stronghold e templo aquáticos juntos</h2>
                        <p style={{ marginBottom:"20px" }}>Seed: 4201395632256542877</p>
                        <p style={{ marginBottom:"20px" }}>Versões: 1.17 para baixo</p>
                        <p style={{ textAlign:"justify" }}>Descrição: Esse mapa, contém uma das maiores anomalias do Minecraft: um templo do oceano e uma stronghold juntas. Contém algumas partes da stronghold passando por dentro do templo aquático, podendo causar confusão nos jogadores, além da fadiga aplicada pelo Elder Guardian que pode dificultar a exploração.</p>
                    </div>
                </section>
                <section className={css.vilaBugada}>
                    <div className={css.imagens}>
                        <img src={VilaBugada} alt="Vila soterrada dentro da mansão." />
                    </div>
                    <div className={css.informacoes}>
                        <h2>Vila dentro da Mansão (literalmente)</h2>
                        <p style={{ marginBottom:"20px" }}>Seed: -9059045145664655421</p>
                        <p style={{ marginBottom:"20px" }}>Versões: 1.17 para baixo</p>
                        <p style={{ textAlign:"justify" }}>Descrição: Coitados dos moradores dessa vila, que foi soterrada dentro da mansão dos seus maiores inimigos graças a geração do jogo que bugou. Esse mapa é interessante, pois fica uns 300 blocos (metros) do Spawn e você pode tentar salvar os aldeões antes que eles morram, fica aí a missão.</p>
                    </div>
                </section>
                <section className={css.portalBugado}>
                    <div className={css.imagens}>
                        <img src={PortalBugado} alt="Portal bugado na stronghold." />
                    </div>
                    <div className={css.informacoes}>
                        <h2>Portal ativado com apenas 5 olhos</h2>
                        <p style={{ marginBottom:"20px" }}>Seed: -7394691493616634517</p>
                        <p style={{ marginBottom:"20px" }}>Versões: 1.17 para baixo</p>
                        <p style={{ textAlign:"justify" }}>Descrição: Esse mapa possui um dos maiores bugs realizados em portais para o The End, ele foi ativado com apenas 5 olhos do fim colocados, sendo que o normal é colocar os 12 olhos para ativar o portal, mas esse portal foi apressado e quis ativar mesmo com 5 olhos. (e tem um isoladinho no outro lado, também)</p>
                    </div>
                </section>
                <section className={css.igluBugado}>
                    <div className={css.imagens}>
                        <img src={IgluBugado} alt="Iglu com chão de bedrock." />
                    </div>
                    <div className={css.informacoes}>
                        <h2>Iglu bugado que vai até a bedrock</h2>
                        <p style={{ marginBottom:"20px" }}>Seed: 171418860962691366</p>
                        <p style={{ marginBottom:"20px" }}>Versões: 1.17 para baixo</p>
                        <p style={{ textAlign:"justify" }}>Descrição: Esse iglu gerou de uma forma estranha, mas ainda sim, gerou em um bioma de planíce de neve, porém dentro de uma ravina, fazendo com que sua passagem secreta chegue até a última camada do jogo na bedrock.</p>
                    </div>
                </section>
            </section>
        </main>
    );
}
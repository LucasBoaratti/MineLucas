import { Route, Routes } from "react-router-dom";
import { Index } from "../Pages/Index";
import { Login } from "../Pages/Login/Login";
import { Cadastro } from "../Pages/Cadastro/Cadastro";
import { Home } from "../Pages/Home/Home";
import { Biomas } from "../Pages/Biomas/Biomas";
import { CriarBiomas } from "../Pages/Biomas/CriarBiomas";
import { EditarBiomas } from "../Pages/Biomas/EditarBiomas";
import { Criaturas } from "../Pages/Criaturas/Criaturas";
import { CriarCriaturas } from "../Pages/Criaturas/CriarCriaturas";
import { EditarCriaturas } from "../Pages/Criaturas/EditarCriaturas";
import { Blocos } from "../Pages/Blocos/Blocos";
import { CriarBlocos } from "../Pages/Blocos/CriarBlocos";
import { EditarBlocos } from "../Pages/Blocos/EditarBlocos";
import { Estruturas } from "../Pages/Estruturas/Estruturas";
import { CriarEstruturas } from "../Pages/Estruturas/CriarEstruturas";
import { EditarEstruturas } from "../Pages/Estruturas/EditarEstruturas";
import { Jogadores } from "../Pages/Jogadores/Jogadores";
import { CriarJogadores } from "../Pages/Jogadores/CriarJogadores";
import { EditarJogadores } from "../Pages/Jogadores/EditarJogadores";

export function Rotas() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Login/>}/>
            </Route>

            <Route path="/cadastro">
                <Route index element={<Cadastro/>}/>
            </Route>

            <Route path="/home" element={<Index/>}>
                <Route index element={<Home/>}/>
            </Route>

            <Route path="/biomas" element={<Index/>}>
                <Route index element={<Biomas/>}/>
            </Route>

            <Route path="/criarBioma" element={<Index/>}>
                <Route index element={<CriarBiomas/>}/>
            </Route>

            <Route path="/editarBioma" element={<Index/>}>
                <Route index element={<EditarBiomas/>}/>
            </Route>

            <Route path="/criaturas" element={<Index/>}>
                <Route index element={<Criaturas/>}/>
            </Route>

            <Route path="/criarCriatura" element={<Index/>}>
                <Route index element={<CriarCriaturas/>}/>
            </Route>

            <Route path="/editarCriatura" element={<Index/>}>
                <Route index element={<EditarCriaturas/>}/>
            </Route>

            <Route path="/blocos" element={<Index/>}>
                <Route index element={<Blocos/>}/>
            </Route>

            <Route path="/criarBloco" element={<Index/>}>
                <Route index element={<CriarBlocos/>}/>
            </Route>

            <Route path="/editarBloco" element={<Index/>}>
                <Route index element={<EditarBlocos/>}/>
            </Route>

            <Route path="/estruturas" element={<Index/>}>
                <Route index element={<Estruturas/>}/>
            </Route>

            <Route path="/criarEstrutura" element={<Index/>}>
                <Route index element={<CriarEstruturas/>}/>
            </Route>

            <Route path="/editarEstrutura" element={<Index/>}>
                <Route index element={<EditarEstruturas/>}/>
            </Route>

            <Route path="/jogadores" element={<Index/>}>
                <Route index element={<Jogadores/>}/>
            </Route>

            <Route path="/criarJogador" element={<Index/>}>
                <Route index element={<CriarJogadores/>}/>
            </Route>

            <Route path="/editarJogador" element={<Index/>}>
                <Route index element={<EditarJogadores/>}/>
            </Route>
        </Routes>
    );
}
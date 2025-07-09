import { Route, Routes } from "react-router-dom";
import { Index } from "../Pages/Index";
import { Login } from "../Pages/Login";
import { Cadastro } from "../Pages/Cadastro";
import { Home } from "../Pages/Home";
import { Biomas } from "../Pages/Biomas";
import { CriarBiomas } from "../Pages/CriarBiomas";

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

            <Route path="/bioma" element={<Index/>}>
                <Route index element={<Biomas/>}/>
            </Route>

            <Route path="/criarBioma" element={<Index/>}>
                <Route index element={<CriarBiomas/>}/>
            </Route>
        </Routes>
    );
}
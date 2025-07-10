import { Route, Routes } from "react-router-dom";
import { Index } from "../Pages/Index";
import { Login } from "../Pages/Login/Login";
import { Cadastro } from "../Pages/Cadastro/Cadastro";
import { Home } from "../Pages/Home/Home";
import { Biomas } from "../Pages/Biomas/Biomas";
import { CriarBiomas } from "../Pages/CriarBiomas";
import { EditarBiomas } from "../Pages/EditarBiomas";
import { Criaturas } from "../Pages/Criaturas/Criaturas";

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
        </Routes>
    );
}
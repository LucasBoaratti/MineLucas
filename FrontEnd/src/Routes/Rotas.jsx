import { Route, Routes } from "react-router-dom";
import { Index } from "../Pages/Index";
import { Login } from "../Pages/Login";

export function Rotas() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Login/>}/>
            </Route>
        </Routes>
    );
}
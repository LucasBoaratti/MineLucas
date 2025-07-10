import React from "react";
import { Outlet } from "react-router-dom";
import { Cabecalho } from "../Components/Cabeçalho/Cabecalho";
import { Rodape } from "../Components/Rodapé/Rodape";

export function Index() {
    return (
        <>
            <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
                <Cabecalho/>
                <div style={{ flex:"1" }}>
                    <Outlet/>
                </div>
                <Rodape/>
            </div>
        </>
    );
}
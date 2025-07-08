import React from "react";
import { Outlet } from "react-router-dom";
import { Cabecalho } from "../Components/Cabecalho";

export function Index() {
    <>
        <Cabecalho/>
        <Outlet/>
    </>
}
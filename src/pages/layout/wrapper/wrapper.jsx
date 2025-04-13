import React, { useEffect } from "react";
import ResponsiveAppBar from "../header/header";
import Footer from "../footer/footer";



export default function Wrapper({ children }) {
    return (
        <>
            <ResponsiveAppBar />
            {children}
            <Footer />
        </>
    );
}
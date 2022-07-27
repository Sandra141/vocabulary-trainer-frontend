import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Cards = () => {
    return (
        <>
        <div className='ContainerForHeaderAndMain'>
            <Header />
            <div className='mainContent'>
                <h2>Deck</h2>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Cards;
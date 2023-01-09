import React from "react";
import Article from "./Article";
import HeaderInvoice from "./HeaderInvoice";

const Letter = ({componentRef}) => {
  
  return (
    <form ref={componentRef}>
      <HeaderInvoice />
      <Article />
    </form>
  );
};

export default Letter;

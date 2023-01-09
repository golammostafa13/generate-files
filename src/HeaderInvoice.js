import React from "react";
import avatar from './avatar.png';

const HeaderInvoice = () => {
  return (
    <header>
      <h1> INVOICE </h1>
      <address>
        <p> MAHESH NANDENNAGARI </p>
        <p> #429, First Floor </p>
        <p> Bettadasanapura </p>
        <p> +918660876889 </p>
      </address>

      <span>
        <img
          alt="MAHESH"
          src={avatar}
          className="rounded float-right align-top"
        />
      </span>
    </header>
  );
};

export default HeaderInvoice;

import React, { Fragment, useEffect } from "react";
import { AvisoLegal } from "../component/avisoLegal.jsx";

export const Legalidad = () => {
  useEffect(() => {
    document.title = "BTFX - Legalidad";
  }, []);

  return (
    <Fragment>
      <div className="container-fluid page-inside-sideband  ">
        <AvisoLegal />
      </div>
    </Fragment>
  );

};


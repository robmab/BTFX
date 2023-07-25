import React, { Fragment, useEffect } from "react";
import { AvisoLegal } from "../component/avisoLegal.jsx";

export const Legalidad = () => {
  useEffect(() => {
    document.title = "BTXF - Legalidad";
  }, []);

  return (
    <Fragment>
      <div className="mt-5 page-wrapper page-inside-wb  ">
        <AvisoLegal />
      </div>
    </Fragment>
  );
};

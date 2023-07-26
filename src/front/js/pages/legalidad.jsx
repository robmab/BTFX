import React, { Fragment, useEffect } from "react";
import { AvisoLegal } from "../component/avisoLegal.jsx";
import { useTitle } from "../hooks/useTitle.jsx";

export const Legalidad = () => {
  useTitle("BTXF - Legalidad");

  return (
    <Fragment>
      <div className="mt-5 page-wrapper page-inside-wb  ">
        <AvisoLegal />
      </div>
    </Fragment>
  );
};

import React, { Fragment, useEffect } from "react";
import { AvisoLegal } from "../component/avisoLegal.jsx";
import { useTitle } from "../hooks/useTitle.jsx";
import { useDimensions } from "../hooks/useDimensions.jsx";

import { TitleHero } from "../component/titleHero.jsx";
import legality from "../../img/legality.jpg";

export const Legalidad = () => {
  useTitle("BTXF - Legalidad");
  const dimensions = useDimensions();

  return (
    <Fragment>
      <div className="mt-5 page-wrapper page-inside-wb  ">
        <TitleHero
          img={legality}
          title={"Políticas"}
          y={dimensions.width < 1100 ? "200" : "420"}
        />
        <AvisoLegal />
      </div>
    </Fragment>
  );
};

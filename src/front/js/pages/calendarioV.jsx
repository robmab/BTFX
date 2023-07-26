import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTitle } from "../hooks/useTitle.jsx";
import { Context } from "../store/appContext";
import { useDimensions } from "../hooks/useDimensions.jsx";

import { TitleHero } from "../component/titleHero.jsx";
import calendario from "../../img/calendario.jpg";

import "../../styles/calendario.css";

import { CalendarioC } from "../component/calendarioC.jsx";
import runners1 from "../../img/runners1.webp";

export const Calendariov = () => {
  const { store, actions } = useContext(Context);

  useTitle("BTXF - Calendario");
  const dimensions = useDimensions();

  return (
    <Fragment>
      <div className="page-inside-wb pt-5 w-25">
        <TitleHero
          img={calendario}
          title={"Calendario"}
          y={dimensions.width < 1100 ? "100" : "350"}
        />

        <div className="container-fluid page-inside-sideband fw-bold  mb-5 rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded ">
          <div className="row body justify-content-center ">
            <div className="w-100 d-inline d-flex align-content-start flex-wrap  ">
              {store.trials.map((item, index) => (
                <>
                  <div
                    className="col-sm-12 col-md-6 d-flex flex-wrap justify-content-center "
                    key={index}
                  >
                    <CalendarioC
                      name={item.name}
                      date_celebration={item.date_celebration}
                      categories={item.categories.sort().join(", ")}
                      location={item.location}
                      participation_limit={item.participation_limit}
                      torneo={item.tournament}
                      id={item.id}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

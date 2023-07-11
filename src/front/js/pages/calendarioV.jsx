import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

import { CalendarioC } from "../component/calendarioC.jsx";
import { Filtros } from "../component/filtros.jsx";

export const Calendariov = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    document.title = "BTXF - Calendario";
  }, []);

  return (
    <Fragment>
      <div className="container-fluid page-inside-sideband  ">
        {/*################# Primer Row ########################## */}
        <div className="row mt-5 ">
          <div className="text-center  ">
            <h1 style={{ fontSize: "33px" }}>PRÓXIMOS EVENTOS</h1>
          </div>

          {/*################# Fin Row ############################# */}
        </div>

        {/* <div className="row">
          <Filtros />
        </div> */}

        {/*################# Segundo Row ########################## */}
        <div className="row body justify-content-center ">
          <div className="w-100 d-inline d-flex align-content-start flex-wrap ">
            {store.trials.map((item) => (
              <>
                <div className="col-sm-12 col-md-6 d-flex flex-wrap justify-content-center ">
                  <CalendarioC
                    name={item.name}
                    date_celebration={item.date_celebration}
                    categories={item.categories.join()}
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
    </Fragment>
  );
};

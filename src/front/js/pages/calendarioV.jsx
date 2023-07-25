import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/calendario.css";


import { CalendarioC } from "../component/calendarioC.jsx";
import runners1 from "../../img/runners1.webp";


export const Calendariov = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    document.title = "BTXF - Calendario";
  }, []);

  return (
    
    <Fragment>
      <div className="page-inside-jh classification opacity-75">
        <div
          style={{ backgroundImage: `url(${runners1})` }}
          className="title"
        >
          <h1 className="fs-1 fw-bold fst-italic">Calendario</h1>
        </div>

      </div>

      <div className="container-fluid page-inside-sideband fw-bold  mb-5 rounded-3 shadow p-3 mb-5 bg-body-tertiary rounded ">
        
        <div className="row  ">
          <div className="text-center mt-5 ">
            <h1 className="fs-1 fw-bold">PRÓXIMOS EVENTOS</h1>
          </div>
        </div>

        <div className="row body justify-content-center ">
          <div className="w-100 d-inline d-flex align-content-start flex-wrap  ">
            {store.trials.map((item,index) => (
              <>
                <div className="col-sm-12 col-md-6 d-flex flex-wrap justify-content-center "
                key={index}>
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

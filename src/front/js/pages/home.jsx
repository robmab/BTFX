import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Context } from "../store/appContext";

import hero from "../../img/hero.jpg";
import "../../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

import { Location } from "../component/location.jsx";

export const Home = () => {
  useEffect(() => {
    document.title = "BTXF";
  }, []);
  const location = useLocation();

  const { store, actions } = useContext(Context);

  /* PARALLAX */
  useEffect(() => {
    document.querySelector("body").onscroll = () => {
      const scrolltotop = document.scrollingElement.scrollTop;
      const target1 = document.querySelector(".hero");
      const xvalue = "center";
      const factor = 0.5;
      const yvalue = scrolltotop * factor;
      target1.style.backgroundPosition = xvalue + " " + yvalue + "px";
    };
  }, [location]);

  return (
    <div className="wrapper-home">
      <div
        style={{
          backgroundImage: `url(${hero})`,
        }}
        className="px-4 py-5 my-5 text-center hero"
      >
        <h1 className="display-5 fw-bold">BTXF</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Bienvenido a nuestra plataforma de inscripción de pruebas ciclistas
            de Bizkaia.
          </p>
        </div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center icon">
          <FontAwesomeIcon type="button" icon={faAnglesDown} />
        </div>
      </div>

      <Location />
    </div>
  );
};

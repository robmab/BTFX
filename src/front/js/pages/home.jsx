import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes,Link } from "react-router-dom";

import { useTitle } from "../hooks/useTitle.jsx";
import { Location } from "../component/location.jsx";
import { useParallax } from "../hooks/useParallax.jsx";

import "../../styles/home.css";

import hero from "../../img/hero.jpg";
import rb from "../../img/rb.webp";
import jh from "../../img/jh.webp";
import js from "../../img/js.webp";

export const Home = () => {
  useTitle("BTXF");
  useParallax(".hero");

  return (
    <div className="wrapper-home">
      <div
        style={{
          backgroundImage: `url(${hero})`,
        }}
        className="px-4 py-5 my-5 text-center hero"
      >
      <h1 className="d-flex display-1 fw-bold text-center ">INSCRIBETE BTXF</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <p className="lead mb-4 fw-normal text-center">
            Bienvenido a nuestra plataforma de inscripción de pruebas ciclistas
            de Bizkaia.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center icon">
          <div className="row justify-content-center align-items-center">
            <div>
              <div className="container-fluid text-center">
                <div className="row my-5">
                    <div className="col-sm-auto col-md-auto fs-6 w-100">
                      <div className="homeedit">
                        <h1 className="text-uppercase fw-bold fst-italic ubi1">INSCRIBETE BTXF</h1>
                        <p className="text-center">
                          En nuestra web, te ofrecemos una experiencia única y sencilla para que puedas inscribirte en las emocionantes pruebas de ciclismo que se realizan en tu región.
                        </p>
                        <div className="row">
                          <div className="btn btn-group col-sm-12 col-md-12 px-0 mt-3" aria-label="Basic example">
                            <Link type="button" className="text-white rounded-pill text-uppercase login-dk fw-bold mx-1 py-2 initRed text-decoration-none fs-6 transiciones" to={`/signup`}>Registrarte</Link>
                            <Link type="button" className="text-white rounded-pill text-uppercase login-dk fw-bold mx-0 py-2 initGray text-decoration-none bg-dark border-0 fs-6 transiciones" to={`/login`}>Iniciar Sesión</Link>
                          </div>
                          <div className="col-auto fs-5 mb-5">
                            <h2 className="fs-1 text-start fw-bold mt-5 fst-italic text-uppercase w-100 homeedit">
                              Diseñado por:
                            </h2>
                            <div className="col-md-auto mb-5 mt-2">
                              <img src={rb} alt="Roberto" className="col-4 homeedit mb-4 rounded-circle" />
                              <img src={jh} alt="Jhoann" className="col-4 homeedit mb-4 rounded-circle" />
                              <img src={js} alt="Josu" className="col-4 homeedit mb-4 rounded-circle" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="ubi">
    <Location/>

  </div>
</div>

      
  );
};

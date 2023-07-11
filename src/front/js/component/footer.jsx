import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/footer.css";

import Log1 from "../../img/Logo1.1.png";
import Log2 from "../../img/logo2.png";
import Log3 from "../../img/logo3.png";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <footer className="footer py-2">
        <div className="container-fluid position-relative">
          <div className="row ml-3 justify-content-between">
            <div className="col-md-4 fs-6 fw-lighter">
              <ul className="nav flex-column gap-2 mt-3">
                <li className="nav-item">
                  <Link
                    className="nav-link active enlaces"
                    aria-current="page"
                    to={`/legalidad`}
                    onClick={() => {
                      navigate("/legalidad");
                    }}
                  >
                    AVISO LEGAL
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link enlaces"
                    to={`/legalidad`}
                    onClick={() => {
                      navigate("/legalidad");
                    }}
                  >
                    POLÍTICA DE COOKIES
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link enlaces "
                    to={`/legalidad`}
                    onClick={() => {
                      navigate("/legalidad");
                    }}
                  >
                    POLÍTICA DE PRIVACIDAD
                  </Link>
                </li>
              </ul>
            </div>

            <div className="container col-md-4 text-center">
              <div className="">
                <img
                  id="Bizk"
                  src={Log1}
                  alt="imagen federación Bizkaina"
                  className="z-n1 position-relative img-fluid"
                />
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="col-md-7 fs-6 fw-lighter">
                <ul className="nav flex-column gap-1 mt-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link enlaces"
                      aria-current="page"
                      to={`/calendario`}
                      onClick={() => {
                        navigate("/calendario");
                      }}
                    >
                      CALENDARIO
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link enlaces"
                      to={`/inscription`}
                      onClick={() => {
                        navigate("/inscription");
                      }}
                    >
                      INSCRIPCIÓN
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link enlaces "
                      to={`/classification`}
                      onClick={() => {
                        navigate("/classification");
                      }}
                    >
                      CLASIFICACIÓN
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="row g-2">
                <li className="col-6 alinear mx-5">
                  <img
                    src={Log2}
                    alt=""
                    className="img-fluid position-relative z-n1 d-inline opacity-75"
                  />
                </li>
                <li className="col-6 alinear">
                  <img
                    src={Log3}
                    alt=""
                    className="img-fluid position-relative z-n1 d-inline opacity-75"
                  />
                </li>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

{
  /*<p></p>
   <nav className="d-flex navbar-expand-lg bg-body-tertiary position-static">
    <div className="container-fluid">
      <ul className="navbar-nav row w-100 p-2">
        <li className="col-lg-2 ">
          <a className="nav-link active" aria-current="page" href="#">
            Politica de privacidad
          </a>
        </li>
        <li className="col-lg-2">
          <a className="nav-link" href="#">
            Politica de cookies
          </a>
        </li>
        <li className="col-lg-2">
          <a className="nav-link" href="#">
            Aviso Legal
          </a>
        </li>
        <li className="col-lg-6 text-end">
          <p>© 2023 Copyright. All rights reserved.</p>
        </li>
      </ul>
    </div>
  </nav> */
}

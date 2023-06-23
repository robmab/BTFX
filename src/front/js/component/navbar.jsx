import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModalLogin } from "./modalLogin.jsx";

import logo from "../../img/BTXF-notext.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { actions } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();
  /* remove parallax listen from home always page change */
  useEffect(() => {
    document.querySelector("body").onscroll = () => {};
  }, [location]);

  const [logged, setLogged] = useState(false);
  const [search, setSearch] = useState(false);
  const [collapse, setCollapse] = useState(false);

  //CAPTURE WIDTH AND HEIGHT WHEN ZOOM IN/OUT
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          onClick={() => {
            setCollapse(false);
            navigate("/");
          }}
          data-bs-toggle={collapse ? `collapse` : ""}
          data-bs-target="#navbarSupportedContent"
          className="navbar-brand"
          to={"/"}
        >
          <img width="80px" src={logo} alt="" />
        </Link>
        <form className="search-form d-flex">
          {dimensions.width < 1000 ? (
            <input
              className="fontAwesome search form-control me-2"
              type="search"
              placeholder="&#xf002;  "
              aria-label="Search"
            />
          ) : (
            <input
              className="fontAwesome search form-control me-2"
              type="search"
              placeholder="&#xf002;  Buscar"
              aria-label="Search"
            />
          )}
        </form>
        {dimensions.width < 1000 ? (
          logged ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuario
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Perfil
                  </a>
                </li>
                <hr className="dropdown-divider" />
                <li>
                  <a className="dropdown-item" href="#">
                    Seguimientos
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Carrito
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => actions.logout()}
                    className="dropdown-item"
                    href="#"
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-success login-mb"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Inicio
              </button>

              <ModalLogin />
            </>
          )
        ) : null}
        <button
          onClick={() => {
            if (!collapse) {
              const myTimeout = setTimeout(() => setCollapse(true), 300);
            } else {
              const myTimeout = setTimeout(() => setCollapse(false), 300);
            }
          }}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Calendario
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Inscripción
              </a>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => {
                  setCollapse(false);
                  navigate("/classification");
                }}
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                className="nav-link active"
                aria-current="page"
              >
                Clasificación
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Noticias
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active disabled"
                aria-current="page"
                href="#"
                style={{ color: "grey" }}
              >
                Tienda
              </a>
            </li>
          </ul>
        </div>
        {dimensions.width > 1000 ? (
          logged ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuario
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Perfil
                  </a>
                </li>
                <hr className="dropdown-divider" />
                <li>
                  <a className="dropdown-item" href="#">
                    Seguimientos
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Carrito
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => actions.logout()}
                    className="dropdown-item"
                    href="#"
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-success login-dk"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Iniciar Sesión
              </button>

              <ModalLogin />
            </>
          )
        ) : null}
      </div>
    </nav>
  );
};

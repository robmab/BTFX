import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModalLogin } from "./modalLogin.jsx";

import logo from "../../img/BTXF-notext.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();
  /* remove parallax listen from home always page change */
  useEffect(() => {
    document.querySelector("body").onscroll = () => {};
  }, [location]);

  const [logged, setLogged] = useState(false);
  const [search, setSearch] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const [username, setUsername] = useState(false);
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("user"))?.role
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("user"))?.role);
    const username = JSON.parse(localStorage.getItem("user"))?.user_name;
    if (username !== undefined)
      setUsername(username.charAt().toUpperCase() + username.slice(1));

    const token = localStorage.getItem("token");
    if (token !== null) {
      setLogged(true);
    } else setLogged(false);
  }, [store.user]);

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
  
    window.addEventListener("scroll", function() {

      const navP = document.querySelector(".navbar");
      navP.classList.toggle("menu-scrolled", window.scrollY > 0);
    });
  
  }, []);

  return (
    <nav className="navbar navbar-expand-lg  ">
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
        {/* <form className="search-form d-flex">
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
        </form> */}
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
                {username}{" "}
                {role === "Manager" && (
                  <i style={{ color: "blue", fontSize: "11px" }}>MG</i>
                )}
                {role === "Admin" && (
                  <i style={{ color: "red", fontSize: "11px" }}>AD</i>
                )}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link
                    onClick={() => {
                      setCollapse(false);
                      navigate("/profile");
                    }}
                    className="dropdown-item"
                    to={"/profile"}
                  >
                    Perfil
                  </Link>
                </li>
                {role !== "User" && (
                  <>
                    <hr className="dropdown-divider" />
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/manager-inscriptions");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Administrar Inscritos
                      </a>
                    </li>
                  </>
                )}
                {role === "Admin" && (
                  <>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-trials");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Gestionar Pruebas
                      </a>
                    </li>
                    {/* <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-events");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Eventos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-tournaments");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Torneos
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-users");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Usuarios
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-clubs");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Clubs
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-teams");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Equipos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-categories");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Categorías
                      </a>
                    </li> */}
                  </>
                )}

                <hr className="dropdown-divider" />
                {/* <li>
                  <a className="dropdown-item" href="#">
                    Seguimientos
                  </a>
                </li> */}

                <li>
                  <a
                    onClick={() => {
                      actions.logout();
                      navigate("/");
                    }}
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
                className="btn btn-success login-mb badge rounded-pill text-bg-dark bg-dark border-0 fs-6 text-white bg-dark border-0 transiciones "
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Inicio Sesion
              </button>

              {showModal && <ModalLogin setShowModal={setShowModal} />}
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
          <span className="navbar-toggler-icon"><i className="fa-solid fa-bars py-1"></i></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 border-0 text-white  text-uppercase fw-bold ">
            <li className="nav-item ">
              <Link
                onClick={() => {
                  setCollapse(false);
                  navigate("/calendario");
                }}
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                className="nav-link text-white fw-bold transiciones"
                aria-current="page"
              >
                Calendario
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                onClick={() => {
                  setCollapse(false);
                  navigate("/inscription");
                }}
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                className="nav-link text-white transiciones fw-bold transiciones"
                aria-current="page"
              >
                Inscripción
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                onClick={() => {
                  setCollapse(false);
                  navigate("/classification");
                }}
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                className="nav-link active text-white  border-0 fw-bold transiciones"
                aria-current="page"
              >
                Clasificación
              </Link>
            </li>
          </ul>
        </div>
        {dimensions.width > 1000 ? (
          logged ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle "
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {username}{" "}
                {role === "Manager" && (
                  <i style={{ color: "blue", fontSize: "12px" }}>MNG</i>
                )}
                {role === "Admin" && (
                  <i style={{ color: "red", fontSize: "12px" }}>ADM</i>
                )}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a
                    onClick={() => {
                      setCollapse(false);
                      navigate("/profile");
                    }}
                    className="dropdown-item"
                    href="#"
                  >
                    Perfil
                  </a>
                </li>
                {role !== "User" && (
                  <>
                    <hr className="dropdown-divider" />
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/manager-inscriptions");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Administrar Inscritos
                      </a>
                    </li>
                  </>
                )}
                {role === "Admin" && (
                  <>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-trials");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Gestionar Pruebas
                      </a>
                    </li>
                    {/*  <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-events");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Eventos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-tournaments");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Torneos
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-users");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Usuarios
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-clubs");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Clubs
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-teams");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Equipos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setCollapse(false);
                          navigate("/admin-categories");
                        }}
                        className="dropdown-item"
                        href="#"
                      >
                        Categorías
                      </a>
                    </li> */}
                  </>
                )}
                <hr className="dropdown-divider" />
                {/* <li>
                  <a className="dropdown-item" href="#">
                    Seguimientos
                  </a>
                </li> */}

                <li>
                  <a
                    onClick={() => {
                      actions.logout();
                      navigate("/");
                    }}
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
                onClick={() => {
                  setShowModal(!showModal);
                }}
                type="button"
                className="btn btn-success login-dk badge rounded-pill text-bg-dark bg-dark border-0 transiciones fs-6"
              >
                Iniciar Sesión
              </button>
              {showModal && <ModalLogin setShowModal={setShowModal} />}
            </>
          )
        ) : null}
      </div>
    </nav>
  );
};

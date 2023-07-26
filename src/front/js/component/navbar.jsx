import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModalLogin } from "./modalLogin.jsx";

import logo from "../../img/BTXF-notext.png";
import "../../styles/navbar.css";

import { useDimensions } from "../hooks/useDimensions.jsx";
import { useScroll } from "../hooks/useScroll.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  //CAPTURE WIDTH AND HEIGHT WHEN ZOOM IN/OUT
  const dimensions = useDimensions();
  const scroll = useScroll();
  const navigate = useNavigate();

  /* Track if Scroll its on top screen */
  const [topScreen, setTopScreen] = useState(false);
  useEffect(() => {
    if (scroll !== 0) setTopScreen(false);
    else setTopScreen(true);
    actions.navbar(true);
  }, [scroll]);

  const [logged, setLogged] = useState(false);
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

  return (
    <nav
      className={`${
        topScreen && !collapse ? null : "navbar-opacity"
      } navbar navbar-expand-lg navbar-light bg-light`}
    >
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
                style={
                  scroll === 0
                    ? {
                        color: "white",
                        textShadow: "2px 2px 2px black",
                        transition:
                          "background-color 150ms linear,color 150ms linear,text-shadow 150ms linear",
                      }
                    : {}
                }
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
                  </>
                )}

                <hr className="dropdown-divider" />

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
              setTimeout(() => setCollapse(true), 300);
            } else {
              setTimeout(() => setCollapse(false), 300);
            }
          }}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={dimensions.width < 1000 && "#navbarSupportedContent"}
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={scroll === 0 ? {} : { backgroundColor: " rgba(0, 0, 0, 0)" }}
        >
          <span className="navbar-toggler-icon">
            <i className="fa-solid fa-bars py-1"></i>
          </span>
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
                data-bs-target={
                  dimensions.width < 1000 && "#navbarSupportedContent"
                }
                className="nav-link active"
                aria-current="page"
                style={
                  scroll === 0 && dimensions.width > 1000
                    ? {
                        color: "white",
                        textShadow: "2px 2px 2px black",
                        transition:
                          "background-color 150ms linear,color 150ms linear,text-shadow 150ms linear",
                      }
                    : {}
                }
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
                data-bs-target={
                  dimensions.width < 1000 && "#navbarSupportedContent"
                }
                className="nav-link active"
                aria-current="page"
                style={
                  scroll === 0 && dimensions.width > 1000
                    ? {
                        color: "white",
                        textShadow: "2px 2px 2px black",
                        transition:
                          "background-color 150ms linear,color 150ms linear,text-shadow 150ms linear",
                      }
                    : {}
                }
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
                data-bs-target={
                  dimensions.width < 1000 && "#navbarSupportedContent"
                }
                className="nav-link active"
                aria-current="page"
                style={
                  scroll === 0 && dimensions.width > 1000
                    ? {
                        color: "white",
                        textShadow: "2px 2px 2px black",
                        transition:
                          "background-color 150ms linear,color 150ms linear,text-shadow 150ms linear",
                      }
                    : {}
                }
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
                style={
                  scroll === 0 && dimensions.width > 1000
                    ? {
                        color: "white",
                        textShadow: "2px 2px 2px black",
                        transition:
                          "background-color 150ms linear,color 150ms linear,text-shadow 150ms linear",
                      }
                    : {}
                }
              >
                {username}{" "}
                {role === "Manager" && (
                  <i
                    style={{
                      color: "blue",
                      fontSize: "12px",
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    MNG
                  </i>
                )}
                {role === "Admin" && (
                  <i
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    ADM
                  </i>
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
                  </>
                )}
                <hr className="dropdown-divider" />

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

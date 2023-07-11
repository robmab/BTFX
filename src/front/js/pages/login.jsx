import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "../../styles/signup.css";

export const Login = () => {
  useEffect(() => {
    document.title = "BTFX - Inicio de Sesión";
  }, []);

  const navigate = useNavigate();
  //Redirect in case user is logged
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
    setLoad(true);
  }, []);

  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  const [firstField, setFirstField] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleFormulary = async (e) => {
    e.preventDefault();

    const loginData = {
      firstField: firstField,
      password: password,
      remember: remember,
    };

    const resp = await actions.login(loginData);
    if (resp === 200) {
      navigate("/");
    }

    if (resp === 401) {
      setAlert(true);
      setAlertText("Dni, email, nombre de usuario o contraseña no encontrado");
      setPassword("");
    }

    if (resp === 400) {
      setAlert(true);
      setAlertText("Error inesperado, porfavor intentelo de nuevo");
      setPassword("");
    }

    if (resp === undefined) {
      setAlert(true);
      setAlertText("Bloqued by CORS policy");
      setPassword("");
    }
  };

  return (
    <div className="page-inside-wb wrapper-formulary pt-5 w-25">
      <>
        <div className="form">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1>Iniciar Sesión</h1>
              <div className="subtitle-submit d-flex">
                <h6>¿No tienes una cuenta?</h6>
                <Link to={`/signup`}>Regístrate</Link>
              </div>
            </div>

            <hr />
            {/* ALERT */}
            {alert ? (
              <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ color: "#fa0000" }}
                />
                <div>{alertText}</div>
              </div>
            ) : null}

            {/* ALERT END G*/}
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                DNI, email o nombre de usuario
              </label>
              <input
                required
                onChange={(e) => {
                  setFirstField(e.target.value);
                  setAlert(false);
                }}
                value={firstField}
                type="text"
                className="form-control"
                id="firstField"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Contraseña</label>
              <input
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAlert(false);
                }}
                value={password}
                type="password"
                className="form-control"
                id="password"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                onChange={(e) => {
                  setRemember(e.target.checked);
                }}
                value={remember}
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Recuerdame{" "}
                <Link to={"/recover-password"}>¿No puedes acceder?</Link>
              </label>
            </div>
            <div className="footer-submit">
              <button type="submit" className={`btn btn-success`}>
                Continuar
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

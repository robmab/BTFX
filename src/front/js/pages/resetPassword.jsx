import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/signup.css";

export const ResetPassword = () => {
  useEffect(() => {
    document.title = "BTXF - Recuperar Contraseña";
  }, []);

  const [token, setToken] = useState(useParams().token.replaceAll("&", "."));

  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  //Redirect in case user is logged
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
    setLoad(true);
  }, []);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");
  const [alertColor, setAlertColor] = useState("red");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const validatePassword = () => {
    if (password !== password2 && password !== "" && password2 !== "") {
      setAlert(true);
      setAlertColor("red");
      setAlertText("Las contraseñas no coinciden");
      return false;
    } else {
      setAlert(false);
      return true;
    }
  };

  const handleFormulary = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    const resp = await actions.resetPassword(password, token);
    if (resp) {
      setAlert(true);
      setAlertText("Contraseña cambiada correctamente.");
      setAlertColor("green");
      setPassword("");
      setPassword2("");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setAlert(true);
      setAlertColor("red");
      setAlertText("Error inesperado, vuelva a intentarlo mas adelante.");
      setPassword("");
      setPassword2("");
    }
  };

  return (
    <div className="page-inside-wb wrapper-formulary pt-5 w-25">
      <>
        <div className="form">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1>Recuperar Contraseña</h1>
              <div className="subtitle-submit d-flex">
                <h6>Porfavor, ingrese su nueva contraseña.</h6>
              </div>
            </div>

            <hr />
            {/* ALERT */}
            {alert ? (
              <div
                className={
                  alertColor === "green"
                    ? "alert alert-success d-flex align-items-center"
                    : "alert alert-danger d-flex align-items-center"
                }
                role="alert"
              >
                <FontAwesomeIcon
                  icon={
                    alertColor === "green"
                      ? faCheckCircle
                      : faTriangleExclamation
                  }
                  style={
                    alertColor === "green"
                      ? { color: "#2c511f" }
                      : { color: "#fa0000" }
                  }
                />
                <div>{alertText}</div>
              </div>
            ) : null}

            {/* ALERT END*/}
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Contraseña*</label>
              <input
                required
                onBlur={validatePassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                className="form-control"
                id="password"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Confirmar contraseña*</label>
              <input
                required
                onBlur={validatePassword}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                value={password2}
                type="password"
                className="form-control"
                id="password2"
                aria-describedby="emailHelp"
              />
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

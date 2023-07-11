import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/signup.css";

export const RecoverPassword = () => {
  useEffect(() => {
    document.title = "BTXF - Recuperar Contraseña";
  }, []);

  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();
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

  const [email, setEmail] = useState("");

  const handleFormulary = async (e) => {
    e.preventDefault();

    const resp = await actions.recoverPassword(email);
    if (resp) {
      setAlert(true);
      setAlertText("Email enviado.");
      setAlertColor("green");
      setEmail("");
    } else {
      setAlert(true);
      setAlertText("Email no existe.");
      setAlertColor("red");
      setEmail("");
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
                <h6>
                  Porfavor, ingrese su email y se le enviará un mensaje con las
                  instrucciones para recuperar su contraseña.
                </h6>
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
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAlert(false);
                }}
                value={email}
                type="email"
                className="form-control"
                id="firstField"
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

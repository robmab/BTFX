import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/formulary.css";

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

  const [email, setEmail] = useState("");

  const handleFormulary = async (e) => {
    e.preventDefault();

    const resp = await actions.recoverPassword(email);
    if (resp) {
      setAlert(true);
      setAlertText("Email enviado.");
      setEmail("");
    } else {
      setAlert(true);
      setAlertText("Email no existe.");
      setEmail("");
    }
  };

  return (
    <div className="page-inside-wb wrapper-formulary pt-5 w-25 mt-5">
      <>
        <div className="form">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1 className="fw-bold fs-1">Recuperar Contraseña</h1>
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
              <button type="submit" className={`btn btn-danger`}>
                Continuar
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

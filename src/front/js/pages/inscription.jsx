import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/signup.css";
import { number } from "prop-types";

export const Inscription = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    document.title = "BTXF - Inscripción";
  }, []);

  const idEvent = parseInt(useParams().idEvent);
  const [event, setEvent] = useState("");

  useEffect(() => {
    if (idEvent !== NaN) {
      store.trials.forEach((item) => {
        if (item.id === idEvent) {
          setEvent(item.name);
        }
      });
    }
  }, []);

  const navigate = useNavigate();
  //Redirect in case user is logged

  const [tok, setTok] = useState("");
  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");
  const [alertColor, setAlertColor] = useState("red");

  const [uciId, setUciId] = useState(null);
  const [fechaN, setFechaN] = useState("");
  const [licencia, setLicencia] = useState(null);
  const [federado, setFederado] = useState("");
  const [sexoUser, setSexoUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      if (user?.uci_id !== null) setUciId(user.uci_id);
      if (user?.licencia !== null) setLicencia(user.licencia);
      if (user?.fecha_nacimiento !== null) setFechaN(user.fecha_nacimiento);
      if (user?.federado !== null) setFederado(user.federado);
      if (user?.sexo !== null) setSexoUser(user.sexo);
    }
  }, [store.user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTok(token);

    if (token === null) {
      navigate("/login");
    }
    setLoad(true);
  }, [store.user]);

  const handleFormulary = async (e) => {
    e.preventDefault();

    const data = {
      uciId: uciId,
      fechaN: fechaN,
      licencia: licencia,
      federado: federado,
      sexoUser: sexoUser,
      event: event,
    };

    const resp = await actions.inscription(data, tok);

    if (resp === 403) {
      setAlert(true);
      setAlertText(`Ya estas registrado para el evento ${event}.`);
      setAlertColor("red");
    }

    if (resp === 200) {
      setAlert(true);
      setAlertText(
        `Registrado al evento ${event} correctamente. Redirigiendo ...`
      );
      setAlertColor("green");

      setTimeout(() => {
        setAlert(false);
        navigate("/calendario");
      }, "5000");
    }

    if (resp === 400) {
      setAlert(true);
      setAlertText(`UCI ID o Licencia ya registrados.`);
      setAlertColor("red");
    }
  };

  return (
    <div className="page-inside-wb wrapper-formulary pt-5 w-25">
      <>
        <div className="form">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1>INSCRIPCIÓN</h1>
              <div className="subtitle-submit d-flex">
                {/* <h6>
                  Recuerda que puedes ver tus inscripciones desde tu perfil.
                </h6> */}
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
              <label>Evento</label>

              <select
                name="select"
                defaultValue={""}
                className="form-control"
                required
                onChange={(e) => {
                  setEvent(e.target.value);
                }}
                id="genero"
                value={event}
              >
                {idEvent === NaN ? (
                  <option hidden value=""></option>
                ) : (
                  <option value={event}>{event}</option>
                )}

                {store.trials?.map((item, index) => (
                  <>
                    {item.id !== idEvent ? (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ) : null}
                  </>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Uci Id</label>

              <input
                required
                onChange={(e) => {
                  setUciId(e.target.value);
                }}
                value={uciId}
                type="number"
                className="form-control"
                id="uciId"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="form-group mb-1">
              <label>Licencia</label>

              <input
                required
                onChange={(e) => {
                  setLicencia(e.target.value);
                }}
                value={licencia}
                type="number"
                className="form-control"
                id="licencia"
              />
            </div>

            <div className="form-group mb-1">
              <label>Fecha de Nacimiento</label>

              <input
                required
                onChange={(e) => {
                  setFechaN(e.target.value);
                }}
                value={fechaN}
                type="date"
                className="form-control"
                id="fechaNacimiento"
              />
            </div>

            <div className="form-group mb-1">
              <label>Federado</label>

              <select
                name="select"
                defaultValue={""}
                className="form-control"
                onChange={(e) => {
                  setFederado(e.target.value);
                }}
                value={federado}
                required
              >
                <option hidden value=""></option>

                <option value="Sí">Sí</option>

                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group mb-1">
              <label>Género</label>

              <select
                name="select"
                defaultValue={""}
                className="form-control"
                required
                onChange={(e) => {
                  setSexoUser(e.target.value);
                }}
                value={sexoUser}
                id="genero"
              >
                <option hidden value=""></option>

                <option value="Hombre">Masculino</option>

                <option value="Mujer">Femenino</option>
              </select>
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

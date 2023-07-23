import React, { useState, useContext, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle.jsx";
import { Context } from "../store/appContext";

import { TitleHero } from "../component/titleHero.jsx";
import { Alert } from "../component/alert.jsx";
import inscription from "../../img/inscription.jpg";

import "../../styles/formulary.css";

export const Inscription = () => {
  useTitle("BTXF - Inscripción");

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const idEvent = parseInt(useParams().idEvent);

  //Alerts
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");
  const [alertColor, setAlertColor] = useState("red");

  //Inputs
  const [uciId, setUciId] = useState(undefined);
  const [date, setDate] = useState("");
  const [license, setLicense] = useState(undefined);
  const [federated, setFederated] = useState("");
  const [gender, setGender] = useState("");

  //Redirect in case user is not logged, and save token
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);

    if (t === null) {
      navigate("/login");
    } else setLoad(true);
  }, [store.user]);

  //Select same event as selected in Calendar page
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

  //Set user date in case that info exists
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      setUciId(user.uci_id);
      setLicense(user.license);
      setDate(user.date);
      setFederated(user.federated);
      setGender(user.gender);
    }
  }, [store.user]);

  /* FORMULARY EVENT */
  const handleFormulary = async (e) => {
    e.preventDefault();

    const data = {
      event: event,
      uciId: uciId,
      license: license,
      date: date,
      federated: federated,
      gender: gender,
    };

    const resp = await actions.inscription(data, token);

    //Alert Responses

    if (resp === 200) {
      setAlert(true);
      setAlertText(
        `Registrado al evento ${event} correctamente. Redirigiendo ...`
      );
      setAlertColor("green");

      setTimeout(() => {
        setAlert(false);
        navigate("/calendario");
      }, "3000");
    }

    if (resp === 400) {
      setAlert(true);
      setAlertText(`UCI ID o Licencia ya registrados.`);
      setAlertColor("red");
    }

    if (resp === 403) {
      setAlert(true);
      setAlertText(`Ya estas registrado para el evento ${event}.`);
      setAlertColor("red");
    }
  };
  /* FORMULARY EVENT END*/

  return (
    <div className="page-inside-wb  pt-5 w-25">
      <TitleHero img={inscription} title={"Inscripción"} y={"110"} />
      {load && (
        <div className="wrapper-formulary">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <div className="subtitle-submit d-flex">
                <h6>
                  Elige la prueba a la que quieres inscribirte. recuerda que
                  todos los datos son obligatorios.
                </h6>
              </div>
            </div>

            <hr />

            {/* ALERT*/}
            <Alert
              alert={alert}
              alertColor={alertColor}
              alertText={alertText}
            />

            {/* EVENT*/}
            <div className="form-group mb-1">
              <label>Evento</label>

              <select
                onChange={(e) => {
                  setEvent(e.target.value);
                }}
                value={event}
                className="form-control"
                required
              >
                {/* Select only and event if choosen in calendary */}
                {idEvent === NaN ? (
                  <option hidden value=""></option>
                ) : (
                  <option value={event}>{event}</option>
                )}

                {/* Loop all events, except the choosen one */}
                {store.trials.map((item, index) => (
                  <Fragment key={index}>
                    {item.id !== idEvent ? (
                      <option value={item.name}>{item.name}</option>
                    ) : null}
                  </Fragment>
                ))}
              </select>
            </div>

            {/* UCI ID*/}
            <div className="form-group">
              <label>Uci Id</label>

              <input
                onChange={(e) => {
                  setUciId(e.target.value);
                }}
                value={uciId}
                className="form-control"
                type="number"
                required
              />
            </div>

            {/* LICENSE*/}
            <div className="form-group mb-1">
              <label>Licencia</label>

              <input
                onChange={(e) => {
                  setLicense(e.target.value);
                }}
                value={license}
                className="form-control"
                type="number"
                required
              />
            </div>

            {/* BIRTHDAY*/}
            <div className="form-group mb-1">
              <label>Fecha de Nacimiento</label>

              <input
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={date === "None" ? "" : date}
                className="form-control"
                type="date"
                required
              />
            </div>

            {/*FEDERATED*/}
            <div className="form-group mb-1">
              <label>Federado</label>

              <select
                onChange={(e) => {
                  setFederated(e.target.value);
                }}
                value={federated}
                className="form-control"
                required
              >
                <option hidden value=""></option>

                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            {/*GENDER*/}
            <div className="form-group mb-1">
              <label>Género</label>

              <select
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                value={gender}
                className="form-control"
                required
              >
                <option hidden value=""></option>
                <option value="Hombre">Masculino</option>
                <option value="Mujer">Femenino</option>
              </select>
            </div>

            {/*BUTTON*/}
            <div className="footer-submit">
              <button type="submit" className={`btn btn-success`}>
                Continuar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

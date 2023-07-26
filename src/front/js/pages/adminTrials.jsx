import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle.jsx";

import { Context } from "../store/appContext";

import "../../styles/config.css";

import { TitleHero } from "../component/titleHero.jsx";
import adminTrials from "../../img/admin-trials.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const AdminTrials = () => {
  useTitle("BTFX Admin - Pruebas");

  const navigate = useNavigate();

  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const [time, setTime] = useState(0);
  const [points, setPoints] = useState({});

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("Error inesperado.");

  //Redirect in case role its User
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user")).role;
    console.log(role);
    if (role === "User" || role === undefined || role === "Manager") {
      navigate("/");
    } else {
      actions.loadTrials();

      setLoad(true);
    }
  }, [store.user]);

  const handleRegisterEvent = async (idEvent, t, p, index) => {
    const data = {
      idEvent: idEvent,
      time: t,
      points: p,
    };

    if (t === undefined || p === undefined || p === "") return;

    const resp = await actions.registerEvent(data);

    const auxT = time;
    const auxP = points;
    auxT[index] = "";
    auxP[index] = "";
    setTime(auxT);
    setPoints(auxP);
    if (resp === 200) {
      actions.firstLoad();
      actions.loadTrials();
    }
  };

  return (
    <div className="page-inside-wb config pt-5 w-25">
      <TitleHero img={adminTrials} title={"Resultados Ciclistas"} y={"270"} />
      {load && (
        <>
          <div className="config-wrapper">
            <div className="body container-fluid">
              {store.eventResults.map((item, index) => (
                <>
                  {item.points === null && (
                    <div key={index} className="item row">
                      <p className="col-12 col-md-2">{item.competition.name}</p>
                      <p className="col-12 col-md-2">
                        {item.user.name} {item.user.subname}
                      </p>
                      <p className="col-12 col-md-2">Dorsal : {item.dorsal}</p>
                      <p className="col-12 col-md-3">
                        Tiempo :
                        <input
                          onChange={(e) => {
                            setTime({ ...time, [index]: e.target.value });
                          }}
                          type="time"
                          step="0.001"
                          value={time[index]}
                        />
                      </p>
                      <p className="col-12 col-md-2">
                        Puntos :{" "}
                        <input
                          onChange={(e) => {
                            setPoints({ ...points, [index]: e.target.value });
                          }}
                          type="number"
                          value={points[index]}
                        />
                      </p>

                      <div className="check col-12 col-md-1 d-flex">
                        <button
                          onClick={() => {
                            handleRegisterEvent(
                              item.id,
                              time[index],
                              points[index],
                              index
                            );
                          }}
                          className="btn btn-success"
                          style={{
                            height: "2em",
                            width: "4em",
                            margin: "auto",
                          }}
                        >
                          <FontAwesomeIcon
                            style={{
                              color: "black",
                              padding: "0",
                              margin: "0 0 12px 0",
                              fontSize: "larger",
                            }}
                            onClick={() => {}}
                            className="yes"
                            icon={faCheck}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

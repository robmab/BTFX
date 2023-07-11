import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/config.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import tool from "../../img/tool.jpg";

export const AdminTrials = () => {
  useEffect(() => {
    document.title = "BTXF Admin - Pruebas";
  }, []);

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

  const handleRegisterEvent = async (idEvent, time, points) => {
    const data = {
      idEvent: idEvent,
      time: time,
      points: points,
    };

    const resp = await actions.registerEvent(data);

    if (resp === 200) {
      actions.firstLoad();
    }
  };

  return (
    <div className="page-inside-wb config pt-5 w-25">
      {load && (
        <>
          <div className="config-wrapper">
            <div style={{ backgroundImage: `url(${tool})` }} className="title">
              <h1>Registrar Eventos</h1>
            </div>
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
                              points[index]
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

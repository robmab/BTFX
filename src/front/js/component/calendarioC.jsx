import React, { Fragment, useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "../../styles/calendario.css";
import img from "../../img/login.jpg";
import cantabria from "../../img/cantabria.jpg";
import barcelona from "../../img/barcelona.jpg";
import valencia from "../../img/valencia.jpg";
import murcia from "../../img/murcia.jpeg";
import baleares from "../../img/baleares.jpg";

export const CalendarioC = (props) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    if (props.img === "cantabria") setImg(cantabria);
    if (props.img === "barcelona") setImg(barcelona);
    if (props.img === "valencia") setImg(valencia);
    if (props.img === "murcia") setImg(murcia);
    if (props.img === "baleares") setImg(baleares);
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="card">
          <div className="box">
            <div className="content">
              <div
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                }}
                className="img"
              >
                <h2>{props.id}</h2>
                <h3>{props.name}</h3>
              </div>
              <div className="content-text">
                <p>
                  Categoria: {props.categories} <br />
                  Participantes: {props.participation_limit} <br />
                  Fecha: {props.date_celebration} <br />
                  Torneo: {props.torneo} <br />
                  Ubicación: {props.location}
                </p>
                <Link to={`/inscription/${props.id}`} className="bg-danger ">
                  Participar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

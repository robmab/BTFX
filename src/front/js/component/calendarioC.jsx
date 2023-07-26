import React, { Fragment, useState, useContext } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "../../styles/calendario.css";
import img from "../../img/login.jpg";

export const CalendarioC = (props) => {
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
                  padding: "0",
                  margin: "0",
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

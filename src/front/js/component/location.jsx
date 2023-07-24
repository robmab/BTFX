import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/location.css";
import { Marker } from "./marker.jsx";
import location from "../../img/locate.jpg";

import GoogleMapReact from "google-map-react";

export const Location = () => {
  const defaultProps = {
    center: {
      lat: 43.2477,
      lng: -2.92777,
    },
    zoom: 15,
  };
  return (
    <>
      <div
        className="location bak-dg2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",

          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.2)),url(${location})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="row d-flex justify-content-center gap-5 fs-2 fw-bold  bak-dg">
          <div className="col-auto">Dirección
            <div className="row"> 
              <p className="fs-6 fw-normal"> 
                
                Teléfono: +34 944 415 049 
                <br/> 
                Email: info@febici.eus 
                </p>
            </div>
          </div>
          <div className="col-auto">Contacto
          <div className="row"> 
              <p className="fs-6 fw-normal"> 
                
                Bizkaiko Txirrindularitza Federakundea <br/>
                Kirol Etxea (Miribilla)  Martín <br/>
                Barua Picaza, 27, 2ª planta,<br/>
                48003 Bilbao – Bizkaia<br/> 
               </p>
            </div>
          </div>
          <div className="col-auto">Horario Verano
          <div className="row"> 
              <p className="fs-6 fw-normal ">
                9:00-14:00 h 15:00-17:00 h
                </p>
            </div>
          </div>
        </div>

        <h1 className ="bak-dg">Localízanos</h1>
        <div
          style={{
            height: "60vh",
            width: "100%",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAnIvuew8skXijw_KBeIo4vZkY4JCV80oQ" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            <Marker
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

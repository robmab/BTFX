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
    <div
      className="location"
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
      <h1>Localízanos</h1>
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
  );
};

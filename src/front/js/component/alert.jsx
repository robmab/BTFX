import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/alert.css";

export const Alert = ({ alert, alertColor, alertText }) => {
  return (
    <>
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
              alertColor === "green" ? faCheckCircle : faTriangleExclamation
            }
            style={
              alertColor === "green"
                ? { color: "#2c511f" }
                : { color: "#fa0000" }
            }
          />
          <div className="alert-text">{alertText}</div>
        </div>
      ) : null}
    </>
  );
};

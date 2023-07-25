import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export const ModalLogin = (props) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  const [firstField, setFirstField] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      firstField: firstField,
      password: password,
      remember: remember,
    };

    const resp = await actions.login(loginData);

    if (resp === 200) {
      props.setShowModal(false);
    }

    if (resp === 401) {
      setAlert(true);
      setAlertText("Dni, email, nombre de usuario o contraseña no encontrado");
      setPassword("");
    }

    if (resp === 400) {
      setAlert(true);
      setAlertText("Error inesperado, porfavor intentelo de nuevo");
      setPassword("");
    }

    if (resp === undefined) {
      setAlert(true);
      setAlertText("Bloqued by CORS policy");
      setPassword("");
    }
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setShowModal(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="modal-backdrop-r">
      <div
        ref={wrapperRef}
        className="modal-content-r"
        id="blur"
        style={alert ? { height: "31em" } : {}}      
        >
        <div className="modal-header-r">
          <div className="title d-flex">
            <h5 className="modal-title-r" id="exampleModalLabel">
              Iniciar Sesión
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => props.setShowModal(false)}
            ></button>
          </div>
          <div className="subtitle d-flex">
            <h6>¿No tienes una cuenta? </h6>
            <Link
              to={`/signup`}
              onClick={() => {
                props.setShowModal(false);
                navigate("/signup");
              }}
            >
              Regístrate
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body-r">
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
                <div className="alert-text">{alertText}</div>
              </div>
            ) : null}

            {/* ALERT END*/}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                DNI, email o nombre de usuario
              </label>
              <input
                onChange={(e) => {
                  setFirstField(e.target.value);
                  setAlert(false);
                }}
                value={firstField}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAlert(false);
                }}
                value={password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                onChange={(e) => {
                  setRemember(e.target.checked);
                }}
                value={remember}
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Recuerdame{" "}
                <Link
                className="text-danger"
                  onClick={() => {
                    props.setShowModal(false);
                    navigate("/recover-password");
                  }}
                  to={"/recover-password"}
                >
                  ¿No puedes acceder?
                </Link>
              </label>
            </div>
            <button type="submit" className="btn btn-danger">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

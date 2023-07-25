import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/formulary.css";

export const Signup = () => {
  useEffect(() => {
    document.title = "BTXF - Registro";
  }, []);

  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [load, setLoad] = useState(false);
  //Redirect in case user is logged
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
    setLoad(true);
  }, []);

  const [dni, setDni] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  /* CHECK DNI */
  const validateDNI = (dniC) => {
    let numero, lett, letra;
    const expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
    const dni = dniC.toUpperCase();

    if (dni === "") {
      setAlert(false);
      return true;
    }

    if (expresion_regular_dni.test(dni) === true) {
      numero = dni.substr(0, dni.length - 1);
      numero = numero.replace("X", 0);
      numero = numero.replace("Y", 1);
      numero = numero.replace("Z", 2);
      lett = dni.substr(dni.length - 1, 1);
      numero = numero % 23;
      letra = "TRWAGMYFPDXBNJZSQVHLCKET";
      letra = letra.substring(numero, numero + 1);
      if (letra != lett) {
        setAlert(true);
        setAlertText("Dni erroneo, la letra del NIF no se corresponde");
        return false;
      } else {
        setAlert(false);
        return true;
      }
    } else {
      setAlert(true);
      setAlertText("Dni erroneo, formato no válido");
      return false;
    }
  };

  const validatePassword = () => {
    if (password !== password2 && password !== "" && password2 !== "") {
      setAlert(true);
      setAlertText("Las contraseñas no coinciden");
      return false;
    } else {
      setAlert(false);
      return true;
    }
  };

  const handleFormulary = async (e) => {
    e.preventDefault();

    if (!validateDNI(dni)) return;

    if (!validatePassword()) return;

    const data = {
      dni: dni,
      username: username,
      name: name,
      subName: subName,
      email: email,
      mobile: mobile,
      password: password,
    };

    const signup = await actions.signup(data);
    if (signup) {
      data.firstField = username;
      const login = await actions.login(data);
      if (login) {
        navigate("/");
      }
      navigate("/");
    }
    setAlert(true);
    setAlertText("Error con el registro, porfavor vuelva a intentarlo.");
  };

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  return (
    <div className="page-inside-wb wrapper-formulary pt-5 w-25">
      <>
        <div className="form">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1>Registro</h1>
              <div className="subtitle-submit d-flex">
                <h6>¿Ya tienes una cuenta?</h6>
                <Link to={`/login`}>Inicia Sesión</Link>
              </div>
            </div>

            <hr />
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
                <div>{alertText}</div>
              </div>
            ) : null}

            {/* ALERT END*/}
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">DNI*</label>
              <input
                required
                onBlur={(e) => validateDNI(e.target.value)}
                onChange={(e) => {
                  setDni(e.target.value);
                }}
                value={dni}
                type="text"
                className="form-control"
                id="dni"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Nombre de usuario*</label>
              <input
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
                minLength="3"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Nombre*</label>
              <input
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Apellidos*</label>
              <input
                required
                onChange={(e) => {
                  setSubName(e.target.value);
                }}
                value={subName}
                type="text"
                className="form-control"
                id="subname"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Email*</label>
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                className="form-control "
                id="email"
                aria-describedby="emailHelp"
                placeholder="example@correo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Número de móvil</label>
              <input
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                value={mobile}
                type="tel"
                pattern="[+]{0,1}[0-9]{0,6}[^\\s+$]{0,1}[0-9]{4,14}"
                className="form-control"
                id="mobile"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Contraseña*</label>
              <input
                required
                onBlur={validatePassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                className="form-control"
                id="password"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Confirmar contraseña*</label>
              <input
                required
                onBlur={validatePassword}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                value={password2}
                type="password"
                className="form-control"
                id="password2"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="footer-submit">
              <button type="submit" className={`btn btn-success`}>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

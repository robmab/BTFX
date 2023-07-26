import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle.jsx";
import { useDimensions } from "../../hooks/useDimensions.jsx";
import { Context } from "../../store/appContext";

import "../../../styles/profile.css";
import { TitleHero } from "../../component/titleHero.jsx";
import profile from "../../../img/profile.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
  useTitle("BTXF - Perfil");
  const dimensions = useDimensions();

  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("Error inesperado.");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subname, setSubname] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");

  //Redirect in case user is logged
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/");
    } else {
      setData(JSON.parse(localStorage.getItem("user")));

      setUsername(JSON.parse(localStorage.getItem("user")).user_name);
      setEmail(JSON.parse(localStorage.getItem("user")).email);
      setName(JSON.parse(localStorage.getItem("user")).name);
      setSubname(JSON.parse(localStorage.getItem("user")).subname);
      setDni(JSON.parse(localStorage.getItem("user")).dni);
      setPhone(JSON.parse(localStorage.getItem("user")).phone);

      setLoad(true);
    }
  }, [store.user]);

  const handleSubmit = async () => {
    const dataUser = {
      username: username,
      email: email,
      name: name,
      subname: subname,
      dni: dni,
      phone: phone,
    };

    const resp = await actions.editProfile(dataUser);

    if (resp) {
      setAlert(false);
      setEdit(false);
    } else {
      setAlert(true);
      setAlertText(
        "Error editando los datos. El DNI, usuario o email que estas intentando editar ya esta en uso."
      );
    }
  };

  return (
    <div className="page-inside-wb profile pt-5 w-25">
      {load && (
        <>
          <TitleHero
            img={profile}
            title={"Perfil"}
            y={dimensions.width < 1160 ? "100" : "400"}
          />

          <div
            className="page-inside-sideband shadow mt-4"
            style={{ width: "55em" }}
          >
            <div className="profile-wrapper   container-fluid">
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
              <div className="row">
                <div className="col-12 col-md-6">
                  <p>Usuario:</p>
                  {edit ? (
                    <input
                      required
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      value={username}
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder={data.user_name}
                    />
                  ) : (
                    <p className="info">{data.user_name}</p>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <p>Email:</p>
                  {edit ? (
                    <input
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder={data.email}
                    />
                  ) : (
                    <p className="info">{data.email}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12 col-md-6">
                  <p>Nombre:</p>
                  {edit ? (
                    <input
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder={data.name}
                    />
                  ) : (
                    <p className="info">{data.name}</p>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <p>Apellidos:</p>
                  {edit ? (
                    <input
                      required
                      onChange={(e) => {
                        setSubname(e.target.value);
                      }}
                      value={subname}
                      type="text"
                      className="form-control"
                      id="subname"
                      placeholder={data.subname}
                    />
                  ) : (
                    <p className="info">{data.subname}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <p>DNI:</p>
                  {edit ? (
                    <input
                      required
                      onChange={(e) => {
                        setDni(e.target.value);
                      }}
                      value={dni}
                      type="text"
                      className="form-control"
                      id="dni"
                      placeholder={data.dni}
                    />
                  ) : (
                    <p className="info">{data.dni}</p>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <p>Teléfono:</p>
                  {edit ? (
                    <input
                      required
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      value={phone}
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder={data.phone}
                    />
                  ) : (
                    <p className="info">{data.phone}</p>
                  )}
                </div>
              </div>
              {!edit && (
                <>
                  <div className="row">
                    <div className="col-12">
                      <p>Rol:</p>
                      <p className="info">
                        {data.role === "User"
                          ? "Usuario"
                          : data.role === "Manager"
                          ? "Manager"
                          : "Administrador"}
                      </p>
                    </div>
                    <div className="col-6"></div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <p>Género:</p>
                      <p className="info">
                        {data.gender === null ? "-" : data.gender}
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p>Fecha Nacimiento:</p>
                      <p className="info">
                        {data.date === null || data.date === "None"
                          ? "-"
                          : data.date}
                      </p>
                    </div>
                    <div className="col-6"></div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <p>Equipo:</p>
                      <p className="info">
                        {data.team === null ? "-" : data.team.name}
                      </p>
                    </div>{" "}
                    <div className="col-12 col-md-6">
                      <p>Club:</p>
                      <p className="info">
                        {data.team === null ? "-" : data.team.club.name}
                      </p>
                    </div>
                    <div className="col-12 col-md-6"></div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <p>Licencia:</p>
                      <p className="info">
                        {data.license === null ? "-" : data.license}
                      </p>
                    </div>{" "}
                    <div className="col-12 col-md-6">
                      <p>Federado:</p>
                      <p className="info">
                        {data.federated === null ? "-" : data.federated}
                      </p>
                    </div>
                    <div className="col-12 col-md-6"></div>
                  </div>
                </>
              )}

              <hr />
              <div className="footer-profile">
                {edit ? (
                  <>
                    <button
                      onClick={() => {
                        handleSubmit();
                      }}
                      type="button"
                      className="accept btn btn-light"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      onClick={() => {
                        setEdit(!edit);
                      }}
                      type="button"
                      className="cancel btn btn-light"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEdit(!edit);
                    }}
                    type="button"
                    className="edit btn btn-light"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

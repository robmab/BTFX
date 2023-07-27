import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle.jsx";
import { useDimensions } from "../hooks/useDimensions.jsx";

import { Context } from "../store/appContext";

import "../../styles/config.css";

import { TitleHero } from "../component/titleHero.jsx";
import inscriptions from "../../img/inscriptions.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import tool from "../../img/tool.jpg";

export const ManagerInscription = () => {
  useTitle("BTFX Manager - Inscripciones");
  const dimensions = useDimensions();

  const navigate = useNavigate();
  const dorsalInput = useRef();

  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("Error inesperado.");

  //Redirect in case role its User
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user")).role;
    console.log(role);
    if (role === "User" || role === undefined) {
      navigate("/");
    } else {
      actions.loadInscriptions();

      setLoad(true);
    }
  }, [store.user]);

  const [dorsal, setDorsal] = useState({});
  const [category, setCategory] = useState({});
  const [team, setTeam] = useState({});

  const userValidation = async (
    userId,
    competitionId,
    dors,
    cat,
    te,
    index
  ) => {
    /* console.log(dorsalInput.current); */

    if (dors === undefined || dors === 0) return;

    const data = {
      user: userId,
      competition: competitionId,
      dorsal: dors,
      category: cat,
      team: te,
    };

    const aux1 = dorsal;
    const aux2 = category;
    const aux3 = team;
    aux1[index] = 0;
    aux2[index] = "";
    aux3[index] = "";
    setDorsal(aux1);
    setCategory(aux2);
    setTeam(aux3);

    const response = await actions.userValidation(data);
    if (response) {
      actions.loadInscriptions();
    }
  };

  const cancelInscription = async (userId, competitionId, index) => {
    const data = {
      user: userId,
      competition: competitionId,
    };

    const response = await actions.cancelInscription(data);
    if (response) {
      actions.loadInscriptions();
    }

    const aux1 = dorsal;
    const aux2 = category;
    const aux3 = team;
    aux1[index] = 0;
    aux2[index] = "";
    aux3[index] = "";
    setDorsal(aux1);
    setCategory(aux2);
    setTeam(aux3);
  };

  return (
    <div className="page-inside-wb config pt-5 w-25">
      <TitleHero
        img={inscriptions}
        title={"Inscripciones"}
        y={dimensions.width < 1000 ? "0" : "250"}
      />
      {load && (
        <>
          <div className="config-wrapper">
            <div className="body container-fluid">
              {store.inscriptions.map((item, index) => (
                <div key={index} className="item row">
                  <p className="col-12 col-md-2">
                    {item.user.name} {item.user.subname}
                  </p>
                  <p className="col-12 col-md-2">{item.competition.name}</p>
                  <p className="col-12 col-md-3">
                    {item.user.category === null ? (
                      <>
                        Categoría:
                        <select
                          onChange={(e) => {
                            setCategory({
                              ...category,
                              [index]: e.target.value,
                            });
                          }}
                          value={category[index]}
                          defaultValue={"value1"}
                          style={{ width: "8em" }}
                          name="select"
                        >
                          <option value="value1"></option>
                          {store.categories?.map((x, y) => (
                            <option key={y} value={x.name}>
                              {x.name}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        Categoría:
                        <select
                          onChange={(e) => {
                            setCategory({
                              ...category,
                              [index]: e.target.value,
                            });
                          }}
                          value={category[index]}
                          style={{ width: "8em" }}
                          name="select"
                          defaultValue={item.user.category}
                        >
                          <option value={item.user.category}>
                            {item.user.category}
                          </option>
                          {store.categories?.map((x, y) => (
                            <>
                              {x.name !== item.user.category && (
                                <option key={y} value={x.name}>
                                  {x.name}
                                </option>
                              )}
                            </>
                          ))}
                        </select>
                      </>
                    )}
                  </p>
                  <p className="col-12 col-md-2">
                    {item.user.team === null ? (
                      <>
                        Equipo:
                        <select
                          onChange={(e) => {
                            setTeam({
                              ...team,
                              [index]: e.target.value,
                            });
                          }}
                          value={team[index]}
                          defaultValue={"value1"}
                          style={{ width: "6em" }}
                          name="select"
                        >
                          <option value="value1"></option>
                          {store.teams?.map((x, y) => (
                            <option key={y} value={x.name}>
                              {x.name}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        Equipo:
                        <select
                          onChange={(e) => {
                            setTeam({
                              ...team,
                              [index]: e.target.value,
                            });
                          }}
                          value={team[index]}
                          style={{ width: "6em" }}
                          name="select"
                          defaultValue={item.user.team.name}
                        >
                          <option value={item.user.team.name}>
                            {item.user.team.name}
                          </option>
                          {store.teams?.map((x, y) => {
                            if (x.name !== item.user.team.name) {
                              return (
                                <option key={y} value={x.name}>
                                  {x.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </>
                    )}
                  </p>

                  <p className="col-12 col-md-2">
                    {" "}
                    Dorsal:{" "}
                    <select
                      /* ref={dorsalInput} */
                      onChange={(e) => {
                        setDorsal({ ...dorsal, [index]: e.target.value });
                      }}
                      value={dorsal[index]}
                      style={{ width: "4em" }}
                      name="select"
                      defaultValue={"value1"}
                    >
                      <option value="value1"></option>
                      {[...Array(item.competition.participation_limit)].map(
                        (x, y) => {
                          const aux = [];

                          store.eventResults.map((a, b) => {
                            if (a.competition.id === item.competition.id) {
                              aux.push(a.dorsal);
                            }
                          });

                          return (
                            <>
                              {!aux.includes(y + 1) && (
                                <option key={y + 1} value={y + 1}>
                                  {y + 1}
                                </option>
                              )}
                            </>
                          );
                        }
                      )}
                    </select>
                  </p>
                  <div className="check col-12 col-md-1 d-flex">
                    <FontAwesomeIcon
                      onClick={() => {
                        userValidation(
                          item.user.id,
                          item.competition.id,
                          dorsal[index],
                          category[index],
                          team[index],
                          index
                        );
                      }}
                      className="yes"
                      icon={faCheck}
                    />
                    <FontAwesomeIcon
                      onClick={() => {
                        cancelInscription(
                          item.user.id,
                          item.competition.id,
                          index
                        );
                      }}
                      className="no"
                      icon={faXmark}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

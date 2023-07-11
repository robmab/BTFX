import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/classification.css";
import "../../styles/table.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import crown from "../../img/crown.png";

export const Classification = () => {
  useEffect(() => {
    document.title = "BTXF - Clasificación";
  }, []);

  const { store } = useContext(Context);

  const [point, setPoint] = useState({ [store.trials[0]?.tournament]: true });
  const [event, setEvent] = useState({});
  const [categorie, setCategorie] = useState({});

  const [runners, setRunners] = useState([]);
  const [sort, setSort] = useState({});

  /* RE-SET TOURNAMENT STATE IN CASE STORE ITS STILL EMPTY */
  useEffect(() => {
    if (store.trials.length > 0) {
      console.log("hello");
      setPoint({ [store.trials[0].tournament]: true });
    }
  }, [store.trials]);

  /* ARRAY OF RUNNERS DEPENDING OF FILTERS/STATES */
  useEffect(() => {
    const aux = [];
    store.trials.map((item) => {
      if (
        Object.keys(point)[0] === item.tournament &&
        Object.keys(event).length === 0
      ) {
        item.runners.map((x) => {
          const filter = aux.filter((y) => y.name === x.name);
          if (filter.length === 0) {
            aux.push(x);
          } else {
            const index = aux.findIndex((e) => e.name === x.name);
            const points = aux[index].points + x.points;

            aux.splice(index, 1);

            /* ES NECESARIO CREAR UNA RÉPLICA DEL ITEM X, 
            PORQUE SI NO ESTARÍA MODIFICANDO DIRECTAMENTE LA STORE!! */
            const replicaX = {};

            for (const i in x) {
              if (i === "points") replicaX[i] = points;
              else replicaX[i] = x[i];
            }
            aux.push(replicaX);
          }
        });
      } else if (
        Object.keys(point)[0] === item.tournament &&
        Object.keys(event)[0] === item.name &&
        Object.keys(categorie).length > 0
      ) {
        item.runners.map((x) => {
          if (x.categorie === Object.keys(categorie)[0]) {
            aux.push(x);
          }
        });
      } else if (
        Object.keys(point)[0] === item.tournament &&
        Object.keys(event)[0] === item.name &&
        Object.keys(event).length > 0
      ) {
        item.runners.map((x) => {
          aux.push(x);
        });
      }
    });

    /* SORT ARRAY BY POINTS */
    aux.sort((a, b) => {
      return b.points - a.points;
    });

    /* ADD NUMBER TO NAME FOR CLARITY */
    const auxNumber = [];
    aux.map((e, i) => {
      const name = `${i + 1}. ${e.name}`;
      const replicaE = {};
      for (const ind in e) {
        if (ind === "name") replicaE[ind] = name;
        else replicaE[ind] = e[ind];
      }
      auxNumber.push(replicaE);
    });

    setRunners(auxNumber);
  }, [point, event, categorie]);

  /* SORT FUNCTION FOR TABLE */
  const handleSort = (e, type) => {
    const id = e.target.id;
    const aux = runners;
    if (sort[type] === true) {
      setSort({ [id]: false });
      if (type === "points") {
        aux.sort((a, b) => {
          return b.points - a.points;
        });
      } else {
        aux.sort((a, b) => {
          let fa = a[type].toLowerCase(),
            fb = b[type].toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      }
    } else {
      setSort({ [id]: true });

      if (type === "points") {
        aux.sort((a, b) => {
          return a.points - b.points;
        });
      } else {
        aux.sort((a, b) => {
          let fa = a[type].toLowerCase(),
            fb = b[type].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }
    }

    setRunners(aux);
  };

  return (
    <>
      {store.trials.length > 0 && store.tournaments.length > 0 ? (
        <div className="page-inside-sideband classification">
          <div
            style={{
              backgroundImage: `url(${crown})`,
              backgroundSize: "10em",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",

              width: "300px",
              height: "9.6em",
              display: "flex",
              alignItems: "center",

              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1>Clasificación</h1>
          </div>

          <div className="filters">
            <div className="tournaments">
              {store.tournaments.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSort({});
                    setEvent({});
                    setPoint({ [item]: true });
                  }}
                  type="button"
                  className={
                    point[item] ? `btn btn-dark btn-sm` : `btn btn-light btn-sm`
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            {Object.values(point)[0] ? (
              <>
                <div className="hr"></div>
                <hr />
                <div className="trials">
                  {store.trials.map((item, index) => (
                    <>
                      {item.tournament === Object.keys(point)[0] && (
                        <button
                          onClick={() => {
                            setSort({});
                            setCategorie({});
                            setEvent({ [item.name]: true });
                          }}
                          key={index}
                          type="button"
                          className={
                            event[item.name]
                              ? "btn btn-dark btn-sm"
                              : "btn btn-light btn-sm"
                          }
                        >
                          {item.name}
                        </button>
                      )}
                    </>
                  ))}
                </div>
              </>
            ) : null}

            {Object.values(event)[0] && Object.values(point)[0] ? (
              <>
                <hr />
                <div className="categories">
                  {store.trials.map((item) => {
                    const arr = [];
                    if (item.name === Object.keys(event)[0]) {
                      item.categories.map((item) => {
                        arr.push(item);
                      });
                    }
                    return (
                      <>
                        {item.name === Object.keys(event)[0]
                          ? arr.map((item, index) => {
                              return (
                                <button
                                  onClick={() => {
                                    setCategorie({ [item]: true });
                                    setSort({});
                                  }}
                                  key={index}
                                  type="button"
                                  className={
                                    categorie[item]
                                      ? "btn btn-dark btn-sm"
                                      : "btn btn-light btn-sm"
                                  }
                                >
                                  {item}
                                </button>
                              );
                            })
                          : null}
                      </>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
          {runners.length === 0 ? (
            <h2>No hay ningún corredor</h2>
          ) : (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th onClick={(e) => handleSort(e, "name")} id="name">
                      Nombre{" "}
                      {sort?.name === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : sort?.name === false ? (
                        <FontAwesomeIcon icon={faCaretDown} />
                      ) : null}
                    </th>
                    <th onClick={(e) => handleSort(e, "team")} id="team">
                      Equipo{" "}
                      {sort?.team === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : sort?.team === false ? (
                        <FontAwesomeIcon icon={faCaretDown} />
                      ) : null}
                    </th>
                    <th
                      onClick={(e) => handleSort(e, "categorie")}
                      id="categorie"
                    >
                      Categoría{" "}
                      {sort?.categorie === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : sort?.categorie === false ? (
                        <FontAwesomeIcon icon={faCaretDown} />
                      ) : null}
                    </th>
                    <th onClick={(e) => handleSort(e, "points")} id="points">
                      Puntos{" "}
                      {sort?.points === true ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : sort?.points === false ? (
                        <FontAwesomeIcon icon={faCaretDown} />
                      ) : null}
                    </th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th colSpan={Object.keys(runners[0]).length}>Año: 2023</th>
                  </tr>
                </tfoot>
                <tbody>
                  {runners.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-title="Nombre">{item.name}</td>
                        <td data-title="Equipo">{item.team}</td>
                        <td data-title="Categoría">{item.categorie}</td>
                        <td data-title="Puntos">{item.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

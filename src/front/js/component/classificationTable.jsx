import React from "react";

import "../../styles/table.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const ClassificationTable = ({
  runners,
  sort,
  date,
  setSort,
  setRunners,
  event,
}) => {
  /* SORT FUNCTION FOR TABLE */
  const handleSort = (type) => {
    const aux = runners;

    /* Check when state is true or false or sort normal or inverse */
    if (sort[type] === true) setSort({ [type]: false });
    else setSort({ [type]: true });

    /* Check if type number or string for diferent method of sort */
    if (type === "points") {
      aux.sort((a, b) => {
        if (sort[type] === true) return b[type] - a[type];
        else return a[type] - b[type];
      });
    } else {
      aux.sort((a, b) => {
        const fa = type === "time" ? a[type] : a["user"][type];
        const fb = type === "time" ? b[type] : b["user"][type];
        if (sort[type] === true) {
          if (fa > fb) return -1;
          if (fa < fb) return 1;
        } else {
          if (fa > fb) return 1;
          if (fa < fb) return -1;
        }
        return 0;
      });
    }

    setRunners(aux);
  };
  return (
    <>
      {runners.length === 0 ? (
        <h2>No hay ningún corredor</h2>
      ) : (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th id="#">#</th>
                <th onClick={() => handleSort("name")}>
                  Nombre
                  {sort.name === true && <FontAwesomeIcon icon={faCaretUp} />}
                  {sort.name === false && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </th>
                <th onClick={() => handleSort("team")}>
                  Equipo
                  {sort.team === true && <FontAwesomeIcon icon={faCaretUp} />}
                  {sort.team === false && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </th>
                <th onClick={() => handleSort("category")}>
                  Categoría
                  {sort.category === true && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                  {sort.category === false && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </th>
                {Object.entries(event).length > 0 && (
                  <th onClick={() => handleSort("time")}>
                    Tiempo
                    {sort.time === true && <FontAwesomeIcon icon={faCaretUp} />}
                    {sort.time === false && (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </th>
                )}
                <th onClick={() => handleSort("points")}>
                  Puntos
                  {sort.points === true && <FontAwesomeIcon icon={faCaretUp} />}
                  {sort.points === false && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th
                  style={{ fontSize: "15px" }}
                  colSpan={Object.entries(event).length > 0 ? 6 : 5}
                >
                  {date}
                </th>
              </tr>
            </tfoot>
            <tbody>
              {runners.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td data-title="Nombre">{item.user.name}</td>
                    <td data-title="Equipo">{item.user.team}</td>
                    <td data-title="Categoría">{item.user.category}</td>
                    {Object.entries(event).length > 0 && (
                      <td data-title="Tiempo">{item.time}</td>
                    )}
                    <td data-title="Puntos">{item.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

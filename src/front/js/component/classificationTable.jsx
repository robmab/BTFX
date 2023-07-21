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
}) => {
  /* SORT FUNCTION FOR TABLE */
  const handleSort = (e, type) => {
    const id = e.target.id;
    const aux = runners;

    /* Check when state is true or false or sort normal or inverse */
    if (sort[type] === true) {
      setSort({ [id]: false });

      /* Check if type number or string for diferent method of sort */
      if (type === "points") aux.sort((a, b) => b.points - a.points);
      else {
        aux.sort((a, b) => {
          const fa = a["user"][type];
          const fb = b["user"][type];

          if (fa > fb) return -1;
          if (fa < fb) return 1;

          return 0;
        });
      }
    } else {
      setSort({ [id]: true });

      /* Check if type number or string for diferent method of sort */
      if (type === "points") aux.sort((a, b) => a.points - b.points);
      else
        aux.sort((a, b) => {
          const fa = a["user"][type];
          const fb = b["user"][type];

          if (fa < fb) return -1;
          if (fa > fb) return 1;

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
                <th onClick={(e) => handleSort(e, "category")} id="category">
                  Categoría{" "}
                  {sort.category === true ? (
                    <FontAwesomeIcon icon={faCaretUp} />
                  ) : sort.category === false ? (
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
                <th colSpan={5}>{date}</th>
              </tr>
            </tfoot>
            <tbody>
              {runners.map((item, index) => {
                return (
                  <tr key={index}>
                    <td data-title="#">{index + 1}</td>
                    <td data-title="Nombre">{item.user.name}</td>
                    <td data-title="Equipo">{item.user.team}</td>
                    <td data-title="Categoría">{item.user.category}</td>
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

import React, { useContext, useState } from "react";
import { useTitle } from "../hooks/useTitle.jsx";
import { Context } from "../store/appContext";

import { ClassificationTable } from "../component/classificationTable.jsx";
import { FiltersClassification } from "../component/filtersClassification.jsx";
import "../../styles/classification.css";

import crown from "../../img/crown.png";

export const Classification = () => {
  useTitle("BTXF - Clasificación");
  const { store } = useContext(Context);

  const [event, setEvent] = useState({});

  const [runners, setRunners] = useState([]);
  const [date, setDate] = useState("-");
  const [sort, setSort] = useState({});

  return (
    <div className="page-inside-sideband classification">
      <div
        className="title"
        style={{
          backgroundImage: `url(${crown})`,
        }}
      >
        <h1>Clasificación</h1>
      </div>
      {store.trials.length > 0 && store.tournaments.length > 0 ? (
        <>
          <FiltersClassification
            setRunners={setRunners}
            setSort={setSort}
            setDate={setDate}
            event={event}
            setEvent={setEvent}
          />

          <ClassificationTable
            runners={runners}
            setRunners={setRunners}
            sort={sort}
            setSort={setSort}
            date={date}
            event={event}
          />
        </>
      ) : null}
    </div>
  );
};

import React, { useContext, useState, useEffect } from "react";
import { useTitle } from "../hooks/useTitle.jsx";
import { Context } from "../store/appContext";

import { ClassificationTable } from "../component/classificationTable.jsx";
import { FiltersClassification } from "../component/filtersClassification.jsx";
import "../../styles/classification.css";

import crown from "../../img/crown.png";

export const Classification = () => {
  useTitle("BTXF - Clasificación");
  const { store } = useContext(Context);

  const [tournament, setTournament] = useState({
    [store.trials[0]?.tournament]: true,
  });
  /* RE-SET TOURNAMENT STATE IN CASE STORE ITS STILL EMPTY */
  useEffect(() => {
    setTournament({ [store.trials[0]?.tournament]: true });
  }, [store.trials]);
  const [event, setEvent] = useState({});
  const [category, setCategory] = useState({});

  const [runners, setRunners] = useState([]);
  const [date, setDate] = useState("-");
  const [sort, setSort] = useState({});

  return (
    <div className="page-inside-wb classification">
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
            tournament={tournament}
            setTournament={setTournament}
            category={category}
            setCategory={setCategory}
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

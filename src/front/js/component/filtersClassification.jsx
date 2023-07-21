import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/filtersClassification.css";

export const FiltersClassification = ({ setSort, setRunners, setDate }) => {
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

  /* ARRAY OF RUNNERS DEPENDING OF FILTERS/STATES */
  useEffect(() => {
    const aux = [];
    store.trials.map((item) => {
      /* Tournaments */
      if (
        Object.keys(tournament)[0] === item.tournament &&
        Object.keys(event).length === 0
      ) {
        setDate("-");
        item.runners.map((x) => {
          const filter = aux.filter((y) => y.user.name === x.user.name);
          if (filter.length === 0) {
            aux.push(x);
          } else {
            const index = aux.findIndex((e) => e.user.name === x.user.name);
            const points = aux[index].points + x.points;

            aux.splice(index, 1);
            const replicaX = {};

            for (const i in x) {
              if (i === "points") replicaX[i] = points;
              else replicaX[i] = x[i];
            }

            aux.push(replicaX);
          }
        });
      } else if (
        /* Categories */
        Object.keys(tournament)[0] === item.tournament &&
        Object.keys(event)[0] === item.name &&
        Object.keys(category).length > 0
      ) {
        setDate(item.date_celebration);
        item.runners.map((x) => {
          if (x.user.category === Object.keys(category)[0]) {
            aux.push(x);
          }
        });
      } else if (
        /* Events */
        Object.keys(tournament)[0] === item.tournament &&
        Object.keys(event)[0] === item.name &&
        Object.keys(event).length > 0
      ) {
        setDate(item.date_celebration);
        item.runners.map((x) => {
          aux.push(x);
        });
      }
    });

    /* Sort array by points */
    aux.sort((a, b) => {
      return b.points - a.points;
    });

    setRunners(aux);
  }, [tournament, event, category]);

  return (
    <div className="filters">
      <div className="tournaments">
        {store.tournaments.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setSort({});
              setEvent({});
              setTournament({ [item]: true });
            }}
            type="button"
            className={
              tournament[item] ? `btn btn-dark btn-sm` : `btn btn-light btn-sm`
            }
          >
            {item}
          </button>
        ))}
      </div>
      {Object.values(tournament)[0] ? (
        <>
          <div className="hr"></div>

          <div className="trials">
            {store.trials.map((item, index) => (
              <Fragment key={index}>
                {item.tournament === Object.keys(tournament)[0] && (
                  <button
                    onClick={() => {
                      setSort({});
                      setCategory({});
                      setEvent({ [item.name]: true });
                    }}
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
              </Fragment>
            ))}
          </div>
        </>
      ) : null}

      {Object.values(event)[0] && Object.values(tournament)[0] ? (
        <>
          <div className="categories">
            {store.trials.map((item, index) => {
              const arr = [];
              if (item.name === Object.keys(event)[0]) {
                item.categories.map((item) => {
                  arr.push(item);
                });
              }
              return (
                <Fragment key={index}>
                  {item.name === Object.keys(event)[0]
                    ? arr.map((item, index) => {
                        return (
                          <button
                            onClick={() => {
                              setCategory({ [item]: true });
                              setSort({});
                            }}
                            key={index}
                            type="button"
                            className={
                              category[item]
                                ? "btn btn-category btn-dark btn-sm"
                                : "btn btn-category btn-light btn-sm"
                            }
                          >
                            {item}
                          </button>
                        );
                      })
                    : null}
                </Fragment>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/filtersClassification.css";

export const FiltersClassification = ({
  setSort,
  setRunners,
  setDate,
  event,
  setEvent,
  tournament,
  setTournament,
  category,
  setCategory,
}) => {
  const { store } = useContext(Context);

  /* ARRAY OF RUNNERS DEPENDING OF FILTERS */
  useEffect(() => {
    const aux = [];

    /* Filter trials */
    const trials =
      Object.entries(event).length === 0
        ? store.trials.filter(
            (e) => Object.keys(tournament)[0] === e.tournament
          )
        : store.trials.filter((e) => Object.keys(event)[0] === e.name);

    /* Add runners */
    if (trials.length > 1) {
      setDate("-");
      /* In case more than 1 trial, sum points*/
      trials.map((item) => {
        item.runners.map((x) => {
          if (!aux.find((e) => e.user.name === x.user.name)) aux.push(x);
          else {
            const index = aux.findIndex((e) => e.user.name === x.user.name);
            const points = aux[index].points + x.points;

            aux.splice(index, 1);
            const runner = {};

            for (const i in x) {
              if (i === "points") runner[i] = points;
              else runner[i] = x[i];
            }

            aux.push(runner);
          }
        });
      });
    } else {
      setDate(trials[0]?.date_celebration);

      /* Add runners */
      trials[0]?.runners.map((item) => {
        /* Events */
        if (Object.keys(category).length === 0) aux.push(item);
        else if (
          /* Categories */
          item.user.category === Object.keys(category)[0]
        )
          aux.push(item);
      });
    }

    /* Sort array by points */
    aux.sort((a, b) => {
      return b.points - a.points;
    });

    setRunners(aux);
  }, [tournament, event, category]);

  return (
    <div className="filters">
      <div className="tournaments">
        {/* TOURNAMENTS */}
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
              tournament[item] ? `button-78 button-78-inv` : `button-78`
            }
          >
            {item}
          </button>
        ))}
      </div>
      {Object.values(tournament)[0] && (
        <>
          <hr className="pill"></hr>

          <div className="trials">
            {/* EVENTS */}
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
                      event[item.name] ? "button-78 button-78-inv" : "button-78"
                    }
                  >
                    {item.name}
                  </button>
                )}
              </Fragment>
            ))}
          </div>
        </>
      )}

      {Object.values(event)[0] && Object.values(tournament)[0] && (
        <>
          <div className="categories">
            {/* CATEGORIES */}
            {store.trials.map((item, index) => {
              let arr = [];
              if (item.name === Object.keys(event)[0]) {
                item.runners.map((x) => {
                  if (!arr.includes(x.user.category)) arr.push(x.user.category);
                });
              }
              arr = arr.sort();
              return (
                <Fragment key={index}>
                  {item.name === Object.keys(event)[0] &&
                    arr.map((item, index) => {
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
                              ? "button-78 button-78-inv"
                              : "button-78 button-78-category"
                          }
                        >
                          {item}
                        </button>
                      );
                    })}
                </Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

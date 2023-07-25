import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  const url = process.env.BACKEND_URL;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    },
  };
  return {
    store: {
      user: {},
      tournaments: [],
      trials: [],
      inscriptions: [],
      categories: [],
      teams: [],
      eventResults: [],
      navbar: false,
    },
    actions: {
      firstLoad: async () => {
        const user = localStorage.getItem("user");
        if (user !== null) {
          const store = getStore();
          store.user = JSON.parse(user);
          setStore(store);
        }

        try {
          const response = await axios.get(`${url}trials`, config);
          const tournaments = await axios.get(`${url}tournaments`, config);

          // console.log(response.data, response.status);
          // console.log(tournaments.data, tournaments.status);

          const store = getStore();

          store.trials = response.data.response;

          store.tournaments = tournaments.data.response;
          setStore(store);

          return 200;
        } catch (error) {
          if (error === undefined) return undefined;
          console.log(error.response?.data, error.response?.status);
          return error.response?.status;
        }
      },

      inscription: async (data, token) => {
        config.headers.Authorization = "Bearer " + token;

        try {
          const resp = await axios.put(`${url}inscription-user`, data, config);
          const store = getStore();
          store.user = resp.data.response;
          setStore(store);
          localStorage.setItem("user", JSON.stringify(resp.data.response));

          console.log(resp.data, resp.status);
          return resp.status;
        } catch (error) {
          console.log(error.response);
          return error.response.status;
        }
      },

      login: async (data) => {
        data.firstField = data.firstField.toLowerCase().replaceAll(" ", "");

        try {
          const response = await axios.post(`${url}login`, data, config);
          console.log(response.data, response.status);
          if (response?.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(response.data.user);

            const store = getStore();
            store.user = response.data.user;
            setStore(store);
          }

          return 200;
        } catch (error) {
          if (error === undefined) return undefined;
          console.log(error.response?.data, error.response?.status);
          return error.response?.status;
        }
      },
      signup: async (data) => {
        data.email = data.email.toLowerCase().replaceAll(" ", "");
        data.mobile = data.mobile.replaceAll(" ", "");
        data.username = data.username.toLowerCase().replaceAll(" ", "");
        data.dni = data.dni.toLowerCase().replaceAll(" ", "");
        console.log(data);

        try {
          const response = await axios.post(`${url}signup`, data, config);
          console.log(response);
          return true;
        } catch (error) {
          console.log(error.response.data, error.response.status);
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const store = getStore();
        store.user = {};
        setStore(store);
      },

      editProfile: async (data) => {
        console.log(data);
        data.email = data.email.toLowerCase().replaceAll(" ", "");
        data.phone = parseInt(data.phone.toString().replaceAll(" ", ""));
        data.name = data.name.replaceAll(" ", "");
        data.subname = data.subname;
        data.username = data.username.toLowerCase().replaceAll(" ", "");
        data.dni = data.dni.toLowerCase().replaceAll(" ", "");

        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
            Authorization: "Bearer " + token,
          },
        };
        try {
          const response = await axios.put(`${url}profile/edit`, data, config);
          console.log(response.data, response.status);

          const user = JSON.parse(localStorage.getItem("user"));
          user.user_name = data.username;
          user.name = data.name;
          user.subname = data.subname;
          user.dni = data.dni;
          user.phone = data.phone;
          user.email = data.email;
          localStorage.setItem("user", JSON.stringify(user));

          const store = getStore();
          store.user = user;
          setStore(store);

          return true;
        } catch (error) {
          console.log(error.response.data, error.response.status);
          return false;
        }
      },
      recoverPassword: async (email) => {
        console.log(email);

        try {
          const response = await axios.post(
            `${url}recoverPassword`,
            email,
            config
          );
          console.log(response.data, response.status);
          return true;
        } catch (error) {
          console.log(error.response.data, error.response.status);
          return false;
        }
      },
      resetPassword: async (password, token) => {
        console.log(token);
        config.headers.Authorization = "Bearer " + token;
        try {
          const response = await axios.put(
            `${url}resetPassword`,
            password,
            config
          );

          console.log(response.data, response.status);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      loadInscriptions: async () => {
        try {
          const store = getStore();

          const response = await axios.get(`${url}inscriptions`, config);
          console.log(response.data, response.status);
          store.inscriptions = response.data.response;
          setStore(store);

          const categories = await axios.get(`${url}categories`, config);
          console.log(categories.data, categories.status);
          store.categories = categories.data.response;
          setStore(store);

          const teams = await axios.get(`${url}teams`, config);
          console.log(teams.data, teams.status);
          store.teams = teams.data.response;
          setStore(store);

          const eventResults = await axios.get(`${url}event-results`, config);
          console.log(eventResults.data, eventResults.status);
          store.eventResults = eventResults.data.response;
          setStore(store);

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      userValidation: async (data) => {
        console.log(data);

        try {
          const response = await axios.post(
            `${url}user-validation`,
            data,
            config
          );

          const responseDelete = await axios.delete(
            `${url}inscriptions-delete/${data.user}/${data.competition}`
          );
          console.log(response.data, response.status);
          console.log(responseDelete.data, responseDelete.status);

          /* LOCAL */
          const store = getStore();
          store.inscriptions = store.inscriptions.filter(
            (e) =>
              !(e.competition.id == data.competition && e.user.id == data.user)
          );

          if (data.category !== null && data.team !== null) {
            store.inscriptions = store.inscriptions.map((x, y) => {
              if (x.user.id === data.user) {
                x.user.category = {};
                x.user.team = {};
                x.user.category.name = data.category;
                x.user.team.name = data.team;
                console.log(data.team);
              }
              return x;
            });
          }
          /* END LOCAL */

          const eventResults = await axios.get(`${url}event-results`, config);
          store.eventResults = eventResults.data.response;

          setStore(store);

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },

      cancelInscription: async (data) => {
        try {
          const responseDelete = await axios.delete(
            `${url}inscriptions-delete/${data.user}/${data.competition}`
          );
          console.log(responseDelete.data, responseDelete.status);

          const store = getStore();
          store.inscriptions = store.inscriptions.filter(
            (e) =>
              !(e.competition.id == data.competition && e.user.id == data.user)
          );

          setStore(store);

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      loadTrials: async () => {
        try {
          const eventResults = await axios.get(`${url}event-results`, config);

          console.log(eventResults.data, eventResults.status);

          const store = getStore();
          store.eventResults = eventResults.data.response;
          setStore(store);

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      registerEvent: async (data) => {
        try {
          const response = await axios.put(
            `${url}register-event`,
            data,
            config
          );

          console.log(response.data, response.status);
          return response.status;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      navbar: (navbar) => {
        const store = getStore();
        if (navbar) store.navbar = true;
        else store.navbar = false;
        setStore(store);
      },
    },
  };
};

export default getState;

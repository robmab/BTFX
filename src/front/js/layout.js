import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { Signup } from "./pages/profile/signup.jsx";
import { Login } from "./pages/profile/login.jsx";
import { Inscription } from "./pages/inscription.jsx";
import { Profile } from "./pages/profile/profile.jsx";
import { Classification } from "./pages/classification.jsx";
import { ManagerInscription } from "./pages/managerInscription.jsx";
import { RecoverPassword } from "./pages/profile/recoverPassword.jsx";
import { ResetPassword } from "./pages/profile/resetPassword.jsx";
import { AdminTrials } from "./pages/adminTrials.jsx";
import { Legalidad } from "./pages/legalidad.jsx";

import background from "../img/background.png";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import { Calendariov } from "./pages/calendarioV.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <div className="page-wrapper">
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Signup />} path="/signup" />
              <Route element={<Login />} path="/login" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<RecoverPassword />} path="/recover-password" />
              <Route
                element={<ResetPassword />}
                path="/reset-password/:token"
              />

              <Route element={<Inscription />} path="/inscription" />

              <Route element={<Inscription />} path="/inscription/:idEvent" />

              <Route element={<Classification />} path="/classification" />
              <Route element={<Calendariov />} path="/calendario" />

              <Route
                element={<ManagerInscription />}
                path="/manager-inscriptions"
              />
              <Route element={<AdminTrials />} path="/admin-trials" />
              <Route element={<Legalidad />} path="/legalidad" />
              <Route element={<Legalidad />} path="/legalidad:id" />

              <Route element={<h1>Not found!</h1>} />
            </Routes>
          </div>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default injectContext(Layout);

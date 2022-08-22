import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import splitbee from "@splitbee/web";
import { teleAnalytic } from "hooks/helper/useTele";
import useSession from "hooks/auth/useSession";

import Layout from "components/Layout/Layout";
import { PrivateRoute, PublicRoute } from "components/Route/Route";
import Spinner from "components/Spinner/Spinner";

const Cerita = lazy(() => import("pages/Cerita"));
const Landing = lazy(() => import("pages/Landing"));
const Login = lazy(() => import("pages/Login"));
const Peta = lazy(() => import("pages/Peta"));
const Register = lazy(() => import("pages/Register"));
const RegisUsername = lazy(() => import("pages/RegisUsername"));
const Timeline = lazy(() => import("pages/Timeline"));
const User = lazy(() => import("pages/User"));
const ForgotPassword = lazy(() => import("pages/ForgotPassword"));
const NotFound = lazy(() => import("pages/404"));

// import Cerita from "pages/Cerita";
// import Landing from "pages/Landing";
// import Login from "pages/Login";
// import Peta from "pages/Peta";
// import Register from "pages/Register";
// import RegisUsername from "pages/RegisUsername";
// import Timeline from "pages/Timeline";
// import User from "pages/User";
// import ForgotPassword from "pages/ForgotPassword";
// import NotFound from "pages/404";

function App() {
  const [getSession, loading] = useSession();

  useEffect(() => {
    // teleAnalytic();
    // splitbee.init();
    getSession();
  }, []);

  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <Spinner loading={true
              } />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/peta" element={<Peta />} />
            <Route
              path="/cerita"
              element={
                <PrivateRoute loading={loading}>
                  <Cerita />
                </PrivateRoute>
              }
            />

            <Route
              path="/timeline"
              element={
                <PrivateRoute loading={loading}>
                  <Timeline />
                </PrivateRoute>
              }
            />

            <Route
              path="/user/:username"
              element={
                <PrivateRoute loading={loading}>
                  <User />
                </PrivateRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute loading={loading}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute loading={loading}>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/register/username"
              element={
                <PublicRoute loading={loading}>
                  <RegisUsername />
                </PublicRoute>
              }
            />

            <Route
              path="/lupa-sandi"
              element={
                <PublicRoute loading={loading}>
                  <ForgotPassword />
                </PublicRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

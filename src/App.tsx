import Layout from "components/Layout/Layout";
import useSession from "hooks/auth/useSession";
import Cerita from "pages/Cerita";
import Landing from "pages/Landing";
import Login from "pages/Login";
import Main from "pages/Peta";
import Register from "pages/Register";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components/Route/Route";
import ForgotPassword from "pages/ForgotPassword";
import NotFound from "pages/404";
import splitbee from "@splitbee/web";
import {teleAnalytic} from "hooks/helper/useTele";
import RegisUsername from "pages/RegisUsername";

function App() {
  const [getSession, loading] = useSession();

  useEffect(() => {
    teleAnalytic();
    splitbee.init();
    getSession();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/peta"
            element={
              <PrivateRoute loading={loading}>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="/cerita"
            element={
              <PrivateRoute loading={loading}>
                <Cerita />
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

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

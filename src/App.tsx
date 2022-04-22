import Layout from "components/Layout/Layout";
import useSession from "hooks/auth/useSession";
import Cerita from "pages/Cerita";
import Landing from "pages/Landing";
import Login from "pages/Login";
import Main from "pages/Main";
import Register from "pages/Register";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components/Route/Route";
import ForgotPassword from "pages/ForgotPassword";


function App() {
  const [getSession, loading] = useSession();

  useEffect(() => {
    getSession();
  }, []);

  return (
    <>
      <BrowserRouter>
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
              path="/lupa-sandi"
              element={
                <PublicRoute loading={loading}>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;

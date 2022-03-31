import Layout from "components/Layout/Layout";
import useSession from "hooks/auth/useSession";
import Cerita from "pages/Cerita";
import DetailCerita from "pages/DetailCerita";
import Kunjungan from "pages/Kunjungan";
import Landing from "pages/Landing";
import Login from "pages/Login";
import Main from "pages/Main";
import Register from "pages/Register";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components/Route/Route";


function App() {
  const [getSession,loading] = useSession();

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
              path="/main"
              element={
                <PrivateRoute loading={loading}>
                  <Main />
                </PrivateRoute>
              }
            />
            <Route path="/cerita" element={<Cerita />} />
            <Route path="/cerita/:slug" element={<DetailCerita />} />
            <Route path="/kunjungan" element={<Kunjungan />} />
            <Route
              path="/login"
              element={
                <PublicRoute loading={loading}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;

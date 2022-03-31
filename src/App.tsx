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
import { authStore } from "store/authStore";

function App() {
  const { setAuthStatus } = authStore((state) => state);
  const [getSession, data, loading] = useSession();

  useEffect(() => {
    getSession();
    if(data){
      setAuthStatus(true,data)
    }else{
      setAuthStatus(false,null)
    }
  }, [setAuthStatus])
  

  

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/main"
              element={
                <PrivateRoute>
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
                <PublicRoute>
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

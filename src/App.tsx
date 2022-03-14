import Layout from "components/Layout/Layout";
import Cerita from "pages/Cerita";
import DetailCerita from "pages/DetailCerita";
import Kunjungan from "pages/Kunjungan";
import Landing from "pages/Landing";
import Login from "pages/Login";
import Main from "pages/Main";
import Register from "pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/main" element={<Main />} />
            <Route path="/cerita" element={<Cerita/>} />
            <Route path="/cerita/:slug" element={<DetailCerita/>} />
            <Route path="/kunjungan" element={<Kunjungan/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;

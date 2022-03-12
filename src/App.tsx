import Layout from "components/Layout/Layout";
import Cerita from "pages/Cerita";
import DetailCerita from "pages/DetailCerita";
import Kunjungan from "pages/Kunjungan";
import Main from "pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<p>Hello World</p>} />
            <Route path="/main" element={<Main />} />
            <Route path="/cerita" element={<Cerita/>} />
            <Route path="/cerita/:slug" element={<DetailCerita/>} />
            <Route path="/kunjungan" element={<Kunjungan/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;

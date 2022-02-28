import Layout from "components/Layout/Layout";
import Main from "pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Hello World</p>} />
          <Route
            path="/main"
            element={
              <Layout>
                <Main />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

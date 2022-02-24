import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Hello World</p>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

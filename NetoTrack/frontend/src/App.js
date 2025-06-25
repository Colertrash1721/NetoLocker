import "./App.css";
import { LoginSession } from "./pages/LoginSession";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import "boxicons/css/boxicons.min.css";
import TraccarMap from "./pages/gueest";
import ShortLink from "./components/shortLInk";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSession />} />
          <Route path="*" element={<LoginSession />} />
          <Route path="/dashboardmain" element={<Main />} />
          <Route path="/dashboardmain/:name" element={<Main />} />
          <Route path="/dashboardmain/:name/:id" element={<Main />} />
          <Route path="/shortLink" element={<ShortLink />} />

          <Route path="/shortLink/token/:token" element={<TraccarMap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

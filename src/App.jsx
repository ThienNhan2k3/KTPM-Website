import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/login-screen";
import Admin from "./views/admin";
import Brand from "./views/brand";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/brand/*" element={<Brand />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

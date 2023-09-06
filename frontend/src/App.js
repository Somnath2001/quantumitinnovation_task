import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./components/header/header";
import Background from "./components/background/background";
import Signin from "./components/signin/signin";
import Footer from "./components/footer/footer";
import Signup from "./components/signup/signup";
import DatatablePage from "./components/datadisplay/Table";
import PrivateRoute from "./apis/privateRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ErrorPage from "./components/404/404";
import { isAuthenticated } from "./apis/helper";

function App() {
  return (
    <div className="parent">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/data"
            element={
              <PrivateRoute>
                <DatatablePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

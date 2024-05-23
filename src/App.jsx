import Login from "./Components/Login/Login"
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup/Signup"
import PropertyListingSeller from "./Pages/PropertyListingSeller/PropertyListingSeller";
import PropertyListingBuyer from "./Pages/PropertyListingBuyer/PropertyListingBuyer";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div className="app">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={!localStorage.getItem('token')?<Login />:<Navigate to="/"/>} />
          <Route path="/signup" element={!localStorage.getItem('token')?<Signup />:<Navigate to="/"/>} />
          <Route path="/" element={!localStorage.getItem('token')?<Navigate to="/login" />:localStorage.getItem('profession')==='seller'?<PropertyListingSeller/>:<PropertyListingBuyer/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

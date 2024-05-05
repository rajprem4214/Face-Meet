import Recognition from "./components/Recognition";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Joining from "./components/Joining";
import Meetings from "./components/Meetings";
import Accounts from "./components/Accounts";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Dashboard Page */}
        <Route path="/" element={<Dashboard />} />
        {/* Login Page */}
        <Route path="/joining" element={<Joining />} />
        {/* Register Page */}
        <Route path="/register" element={<Register />} />
        
        <Route path="/meetings" element={<Meetings />} />

        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </div>
  );
}

export default App;

import Recognition from "./components/Recognition";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Dashboard Page */}
        <Route path="/" element={<Dashboard />} />
        {/* Login Page */}
        <Route path="/recognition" element={<Recognition />} />
        {/* Register Page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

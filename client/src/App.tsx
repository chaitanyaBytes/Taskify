import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Appbar from "./components/Appbar";
import Landing from "./components/Landing";

function App() {
  return (
    <div>
      <div>
        <Appbar />
      </div>
      <Routes>
        <Route path="/auth" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;

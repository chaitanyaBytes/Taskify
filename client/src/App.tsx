import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import Homepage from "./components/Homepage";
import Authpage from "./components/Authpage";
import InitUser from "./components/InitUser";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <div>
      <div>
        <InitUser />
        <Appbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={user.username ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user.username ? <Authpage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "./atoms/userAtom";
import Homepage from "./components/Homepage";
import Authpage from "./components/Authpage";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <div>
      <div>
        <Appbar />
        <InitUser />
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

const InitUser = () => {
  const setUser = useSetRecoilState(userAtom);
  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(response.data.user);
      if (response.data.user) {
        setUser({ username: response.data.user.username });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
};

export default App;

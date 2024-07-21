import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar";
import Landing from "./components/Landing";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import userAtom from "./atoms/userAtom";

function App() {
  return (
    <div>
      <div>
        <Appbar />
        <InitUser />
      </div>
      <Routes>
        <Route path="/auth" element={<Landing />} />
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

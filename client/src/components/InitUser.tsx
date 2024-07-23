import userAtom from "@/atoms/userAtom";
import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const InitUser = () => {
  const setUser = useSetRecoilState(userAtom);
  const init = async () => {
    try {
      const response = await axios.get("https://todo-app-kbyc.onrender.com/user/me", {
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

export default InitUser;

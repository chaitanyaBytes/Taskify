import { atom } from "recoil";
import axios from "axios";

let user: any = {};

const init = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log(response.data);

    if (response.data.user) {
      user = response.data.user;
    }
  } catch (e) {
    console.log(e);
  }
};

init();

const userAtom = atom({
  key: "userAtom",
  default: user,
});

export default userAtom;

import { atom } from "recoil";

interface UserState {
  username: string | null;
}

const userAtom = atom<UserState>({
  key: "userAtom",
  default: {
    username: null,
  },
});

export default userAtom;

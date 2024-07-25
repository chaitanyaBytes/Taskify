import { atom } from "recoil";

const dueDateAtom = atom<Date | undefined>({
  key: "dueDateAtom",
  default: undefined,
});

export default dueDateAtom;

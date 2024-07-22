import { atom } from "recoil";

export interface TodoType {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

const todoListState = atom<TodoType[]>({
  key: "todoAtom",
  default: [],
});

export default todoListState;

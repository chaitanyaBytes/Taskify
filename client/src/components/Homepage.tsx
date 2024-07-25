import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import todoListState from "@/atoms/todoAtom";
import { useRecoilState } from "recoil";
import { DialogDemo } from "./AddTodoButton";

export default function Homepage() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        "https://todo-app-kbyc.onrender.com/todo/myTodos",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = res.data;
      setTodos(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error: ", e);
      toast.error("error in fetching the posts");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [setTodos]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-black text-3xl"> Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <DialogDemo />
      <div className="flex flex-col justify-center items-center mt-3">
        {todos.map((todo) => (
          <TodoCard key={todo._id} {...todo} />
        ))}
      </div>
    </div>
  );
}

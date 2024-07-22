import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import todoListState from "@/atoms/todoAtom";
import { useRecoilState } from "recoil";

export default function Homepage() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/todo/myTodos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = res.data;
      console.log(data);
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!todos) {
    return null;
  }

  return (
    todos && (
      <div className="flex flex-wrap justify-center gap-10 mt-8">
        {todos.map((todo) => (
          <TodoCard key={todo._id} {...todo} />
        ))}
      </div>
    )
  );
}

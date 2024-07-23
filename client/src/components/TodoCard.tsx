import { Check, Ban } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSetRecoilState } from "recoil";
import todoListState from "@/atoms/todoAtom";
import toast from "react-hot-toast";
import { useState } from "react";

interface CardProps extends React.ComponentProps<typeof Card> {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

function TodoCard({ className, ...props }: CardProps) {
  const setTodos = useSetRecoilState(todoListState);
  const [isCompleted, setIsCompleted] = useState(props.done);

  const handleLogout = async (id: string) => {
    try {
      const res = await axios.delete(
        `https://todo-app-kbyc.onrender.com/todo/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = res.data;
      console.log(data);
      if (!data) {
        console.log("error deleting the todo");
        toast.error(data.error);
      }

      setTodos((oldTodos) => oldTodos.filter((todo) => todo._id !== id));
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error("cannot delete the todo");
    }
  };

  const ToggleComplete = async (id: string) => {
    console.log(id);
    console.log(isCompleted);
    try {
      const res = await axios.put(
        `https://todo-app-kbyc.onrender.com/todo/update/${id}`, // Use the passed id here
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = res.data;
      console.log(data);

      if (!data) {
        console.log("error updating the todo");
        toast.error(data.error);
      }

      setIsCompleted((isCompleted) => !isCompleted);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error("cannot update the todo");
    }
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle
          className={`font-bold text-3xl ${
            isCompleted ? "line-through" : "no-underline"
          }`}
        >
          {props.title}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div className="space-y-1">
            <p
              className={`text-2xl font-medium leading-none ${
                isCompleted ? "line-through" : "no-underline"
              } `}
            >
              {props.description}
            </p>
            <p className="text-sm text-muted-foreground"></p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-3">
        <Button
          className={`w-full ${isCompleted ? "bg-blue-600 hover:bg-blue-400" : "bg-black"}`}
          onClick={() => ToggleComplete(props._id)}
        >
          <Check className={`mr-2 h-4 w-4`} />{" "}
          {isCompleted ? "Completed" : "Mark Done"}
        </Button>
        <Button className="w-full" onClick={() => handleLogout(props._id)}>
          <Ban className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TodoCard;

import { Check, CircleX, Dot, CalendarDays } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSetRecoilState } from "recoil";
import todoListState from "@/atoms/todoAtom";
import toast from "react-hot-toast";
import { useState } from "react";
import { formatDate } from "date-fns";
interface CardProps extends React.ComponentProps<typeof Card> {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
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
        toast.error("Cannot delete the task");
      }

      setTodos((oldTodos) => oldTodos.filter((todo) => todo._id !== id));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("cannot delete the task");
    }
  };

  const ToggleComplete = async (id: string) => {
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

      if (!data) {
        console.log("error updating the task");
        toast.error("task is not updated");
      }

      setIsCompleted((isCompleted) => !isCompleted);
      toast.success("Task updated succeffully!");
    } catch (err) {
      console.log(err);
      toast.error("cannot update the task");
    }
  };

  return (
    <div className="w-full px-4 sm:px-7">
      <Card className={cn("my-2 shadow-md ", className)} {...props}>
        {/* <CardHeader className="pt-2 pl-6 pb-0 flex flex-row justify-between">
          <CardTitle
            className={`font-normal text-md ${
              isCompleted ? "line-through" : "none"
            }`}
          >
            {props.title}
          </CardTitle>
          <CircleX
            onClick={() => handleLogout(props._id)}
            className="cursor-pointert size-5"
          />
        </CardHeader> */}
        <CardContent className="pl-8 pr-2 py-1 flex flex-row justify-between">
          <div className="flex gap-4 items-center sm:gap-7">
            <div>
              <div className="flex items-center space-x-2"></div>
              <Button
                className={`px-0 mb-2 size-4 rounded-full bg-white border-blue-600 border ${
                  isCompleted
                    ? "bg-blue-600 hover:bg-blue-400"
                    : "hover:bg-slate-200 border-blue-600 border"
                }`}
                onClick={() => ToggleComplete(props._id)}
              >
                {isCompleted ? <Check className="size-4" /> : ""}
              </Button>
            </div>
            <div>
              <div
                className={`font-normal text-md ${
                  isCompleted ? "line-through" : "none"
                }`}
              >
                {props.title}
              </div>
              <p
                className={`flex flex-wrap items-center text-sm font-light leading-none`}
              >
                {props.description}
                <Dot className="mt-0.5" />
                <div className="flex items-center">
                  <CalendarDays className="size-[18px] mr-2 text-blue-700" />
                  <p className="text-blue-700 font-normal mb-0.5">
                    {" "}
                    Due{" "}
                    {props.dueDate ? (
                      formatDate(props.dueDate, "PPP")
                    ) : (
                      <span>Today</span>
                    )}
                  </p>
                </div>
              </p>
            </div>
          </div>

          <CircleX
            onClick={() => handleLogout(props._id)}
            className="cursor-pointert size-5 mt-1"
          />
        </CardContent>
        {/* <CardFooter className="pt-2 pl-6 pb-2">
          <Button
            className={`h-6 px-0 w-[120px] ${
              isCompleted ? "bg-blue-600 hover:bg-blue-400" : "bg-black"
            }`}
            onClick={() => ToggleComplete(props._id)}
          >
            <Check className={`mr-0.5 h-3 w-3`} />{" "}
            <div className="text-xs">
              {isCompleted ? "Completed" : "Mark Done"}
            </div>
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default TodoCard;

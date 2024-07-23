import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import todoListState from "@/atoms/todoAtom";
import toast from "react-hot-toast";
import axios from "axios";

export function DialogDemo() {
  const [title, setTitle] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const setTodos = useSetRecoilState(todoListState);

  async function handleSubmit() {
    try {
      console.log(localStorage.getItem("token"));
      const res = await axios.post(
        "https://todo-app-kbyc.onrender.com/todo/create",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = res.data;
      console.log(data);
      setTodos((oldTodos) => [...oldTodos, data.newTodo]);
      toast.success("Task Added!");
    } catch (err) {
      console.log(err);
      toast.error("Oops! Task is not added");
    }
  }

  return (
    <Dialog>
      <div className="flex items-center bg-black rounded-lg mx-40">
        <DialogTrigger asChild>
          <Button className="bg-black hover:bg-black rounded-xl">
            <Plus className="w-6 h-6 text-white cursor-pointer " />
          </Button>
        </DialogTrigger>
        <div className="text-white text-lg">Add a task</div>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <DialogDescription>
            Add a new Task. Click Add when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="assignment"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="complete the assignment today"
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Add Task
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { DatePicker } from "./ui/DatePicker";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import todoListState from "@/atoms/todoAtom";
import toast from "react-hot-toast";
import axios from "axios";
import dueDateAtom from "@/atoms/dueDateAtom";

export function DialogDemo() {
  const [title, setTitle] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [dueDate, setDueDate] = useRecoilState(dueDateAtom);
  const setTodos = useSetRecoilState(todoListState);

  async function handleSubmit() {
    try {
      const res = await axios.post(
        "https://todo-app-kbyc.onrender.com/todo/create",
        {
          title: title,
          description: description,
          dueDate: dueDate,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = res.data;
      setTodos((oldTodos) => [...oldTodos, data.newTodo]);
      setDueDate(undefined);
      toast.success("Task Added!");
    } catch (err) {
      console.log(err);
      toast.error("Oops! Task is not added");
    }
  }

  return (
    <Dialog>
      <div className="flex items-center mx-4 mt-8 h-[55px] bg-white rounded-md shadow-md border-slate-200 border sm:mx-7">
        <DialogTrigger asChild>
          <Button className="bg-white hover:bg-white rounded-md mr-3 pr-0">
            <Plus className="w-6 h-6 text-blue-600 cursor-pointer" />
          </Button>
        </DialogTrigger>
        <div className="text-blue-700 text-md">Add a task</div>
      </div>
      <DialogContent className="max-w-[330px] rounded-lg sm:max-w-[425px]">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Date</Label>
            <div className="col-span-3">
              <DatePicker type={"Due"} />
            </div>
          </div>
        </div>
        <DialogFooter className="items-center gap-2 flex flex-row justify-end">
          <DatePicker type={"Reminder"} />
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

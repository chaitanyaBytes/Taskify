"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authAtom from "../atoms/authAtom";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "password must be at least 4 characters.",
  }),
});

export default function LoginPage() {
  const setUser = useSetRecoilState(userAtom);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;

      localStorage.setItem("token", data.token);
      setUser(data.username);
      toast.success("successfully logged in.");
      navigate("/");
    } catch (err) {
      console.log("error in logging in.");
      toast.error("Invalid Credentials.");
    }
  }

  return (
    <div className="flex flex-row h-screen w-screen items-center justify-center">
      <div className="bg-black p-6 w-[400px] rounded-lg mb-48">
        <p className="text-white text-2xl font-semibold font-sans mb-4">
          Login to Taskify
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-white mt-2 py-2 text-lg">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white mt-2 py-2 text-lg">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-700">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

import { z } from "zod";
import { toast } from "react-hot-toast";
import axios from "axios";

import authAtom from "../atoms/authAtom";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters long" }),

  password: z
    .string()
    .min(4, { message: "password must be at leastt 4 characters long" }),
});

export default function LoginPage() {
  const setUser = useSetRecoilState(userAtom);
  const setAuth = useSetRecoilState(authAtom);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("http://localhost:3000/user/login", values, {
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = res.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      setUser({ username: data.username });
      toast.success(data.message);
    } catch (err) {
      console.log("error in logging in");
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return <>login page</>;
}

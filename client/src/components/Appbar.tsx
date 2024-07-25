import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import toast from "react-hot-toast";
import { LogOut, CalendarCheck } from "lucide-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import authAtom from "@/atoms/authAtom";
import { UserAvatar } from "./UserAvatar";

export default function Appbar() {
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogout = () => {
    try {
      localStorage.setItem("token", "");
      toast.success("logged out successfully");
      setUser({ username: null });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-[#2564CF] flex items-center content-center justify-between h-[46px]">
      <div className="flex gap-2">
        <div className="ml-5 text-xl text-white font-medium tracking-widest cursor-pointer sm:ml-9">
          TASKIFY
        </div>
        <CalendarCheck className="text-white mt-0.5 w-6 h-6" />
      </div>

      {!user.username && (
        <div className="hidden sm:flex gap-4 items-center content-center sm:mr-12">
          <div>
            <Link to="/">
              <AiFillHome
                size={24}
                className="cursor-pointer text-white hover:text-gray-300"
              />
            </Link>
          </div>
          <div
            className="text-lg cursor-pointer text-white hover:text-gray-300"
            onClick={() => {
              setAuth("login");
            }}
          >
            Login
          </div>
          <div
            className="text-lg text-white cursor-pointer hover:text-gray-300"
            onClick={() => setAuth("signup")}
          >
            Signup
          </div>
        </div>
      )}

      {user.username && (
        <div className="flex items-center gap-3 content-center justify-between my-4 mr-5 sm:my-0 sm:gap-6 sm:mr-12">
          <div className="flex gap-2">
            <UserAvatar />
            <div className="hidden sm:contents sm:text-lg sm:font-light sm:text-white">
              {user.username}
            </div>
          </div>
          <div onClick={handleLogout}>
            <LogOut
              className="cursor-pointer mb-1 text-white hover:text-gray-300"
              size={24}
            />
          </div>
        </div>
      )}
    </div>
  );
}

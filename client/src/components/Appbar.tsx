import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { useRecoilState, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import authAtom from "@/atoms/authAtom";

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
    <div className="flex flex-col justify-start items-center sm:flex sm:flex-row sm:items-center sm:content-center sm:justify-around sm:h-20">
      <div className="flex gap-2 md:gap-5">
        <div className="text-3xl font-semibold tracking-widest cursor-pointer">
          TASKIFY
        </div>
        <img src="/applogo.svg" alt="logo" className="w-10 h-10" />
      </div>

      {!user.username && (
        <div className="hidden sm:flex gap-4 items-center content-center">
          <div>
            <Link to="/">
              <AiFillHome size={30} className="cursor-pointer" />
            </Link>
          </div>
          <div
            className="text-2xl cursor-pointer"
            onClick={() => {
              setAuth("login");
            }}
          >
            Login
          </div>
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setAuth("signup")}
          >
            Signup
          </div>
        </div>
      )}

      {user.username && (
        <div className="flex items-center gap-16 content-center justify-between my-4 sm:my-0 sm:gap-9">
          <div className="flex gap-1">
            <img src="/person.svg" alt="profile-icon" className="w-7 h-7" />
            <div className="text-2xl font-semibold">{user.username}</div>
          </div>
          <div onClick={handleLogout}>
            <IoIosLogOut className="cursor-pointer" size={30} />
          </div>
        </div>
      )}
    </div>
  );
}

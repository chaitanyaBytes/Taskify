import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHome } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
export default function Appbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.user) {
        setUser(response.data.user.username);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    init();
  }, [user]);

  const handleLogout = () => {
    try {
      localStorage.setItem("token", "");
      toast.success("logged out successfully");
      navigate("/auth");
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row items-center content-center justify-around h-20">
      <div className="flex gap-5">
        <div className="text-3xl font-semibold tracking-widest cursor-pointer">
          TASKIFY
        </div>
        <img src="/applogo.svg" alt="logo" className="w-10 h-10" />
      </div>

      {!user && (
        <div className="flex gap-4 items-center content-center">
          <div>
            <Link to="/">
              <AiFillHome size={30} className="cursor-pointer" />
            </Link>
          </div>
          <div
            className="text-2xl cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Login
          </div>
          <div
            className="text-2xl cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Signup
          </div>
        </div>
      )}

      {user && (
        <div className="flex gap-9 items-center content-center">
          <div className="flex gap-1">
            <img src="/person.svg" alt="profile-icon" className="w-7 h-7" />
            <div className="text-2xl font-semibold">{user}</div>
          </div>
          <div onClick={handleLogout}>
            <IoIosLogOut className="cursor-pointer" size={30} />
          </div>
        </div>
      )}
    </div>
  );
}

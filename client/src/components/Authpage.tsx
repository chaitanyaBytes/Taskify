import { useRecoilValue } from "recoil";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import authAtom from "../atoms/authAtom";

const Authpage = () => {
  const authState = useRecoilValue(authAtom);

  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <p className="text-white">
        {authState == "login" ? <LoginPage /> : <SignupPage />}
      </p>
    </div>
  );
};

export default Authpage;

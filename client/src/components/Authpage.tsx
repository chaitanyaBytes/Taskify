import { useRecoilValue } from "recoil";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import authAtom from "../atoms/authAtom";

const Authpage = () => {
  const authState = useRecoilValue(authAtom);

  return (
    <div className="flex flex-row h-screen items-center justify-center">
      {authState == "login" ? <LoginPage /> : <SignupPage />}
    </div>
  );
};

export default Authpage;

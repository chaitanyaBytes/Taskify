import userAtom from "@/atoms/userAtom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRecoilValue } from "recoil";

export function UserAvatar() {
  const user = useRecoilValue(userAtom);
  const userInitials = user.username?.slice(0, 2).toUpperCase();
  return (
    <Avatar className="w-[31px] h-[31px]">
      <AvatarFallback>{userInitials}</AvatarFallback>
    </Avatar>
  );
}

import { User, UserCircle } from "lucide-react";
import SignOutButton from "./SignOutButton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function MyAccount({ email }: { email: string } ) {
  return (
    <Popover>
      <PopoverTrigger className="p-2 flex flex-col items-center rounded-lg justify-center active:bg-blue-200 hover:bg-blue-100 ">
        <UserCircle/>
      </PopoverTrigger>
      <PopoverContent>
        {email} <SignOutButton />
      </PopoverContent>
    </Popover>
  );
}

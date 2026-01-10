import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Session } from "next-auth";

interface UserAvatarProps {
  session: Session;
}

export function UserAvatar({ session }: UserAvatarProps) {
  if (!session?.user) return null;

  const imageUrl = session.user.image ?? "/default-avatar.png"; // default image URL

  return (
    <div>
      <Avatar className="h-9 w-9 border-2 border-primary/10">
        <AvatarImage
          src={imageUrl}
          alt={session.user.name || "User Avatar"} />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-medium">
          {session.user.name?.split(" ").map((name) => name[0].toUpperCase()).join("")}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

import { useEffect, useState } from "react";

type User = {
  name: string;
  avatar?: string | null;
};

export const UserAvatar = ({ user }: { user: User }) => {
  const [imageError, setImageError] = useState(false);

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";

  // Reset imageError whenever avatar URL changes
  useEffect(() => {
    setImageError(false);
  }, [user?.avatar]);

  return (
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden text-slate-700 font-extrabold">
      {user?.avatar && !imageError ? (
        <img
          src={user.avatar}
          alt={user.name}
          onError={() => {
            console.error("Image failed to load:", user.avatar);
            setImageError(true);
          }}
          className="w-full h-full object-cover"
        />
      ) : (
        firstLetter
      )}
    </div>
  );
};
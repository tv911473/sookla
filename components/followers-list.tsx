"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FollowerData = {
  follower_id: string;
  users: {
    username: string;
  } | null;
};

interface FollowersListProps {
  followers: FollowerData[] | null;
}

const FollowersList = ({ followers }: FollowersListProps) => {
  const [isFollowersVisible, setIsFollowersVisible] = useState(false);
  const router = useRouter();

  const toggleFollowers = () => {
    setIsFollowersVisible((prev) => !prev);
  };

  const hasFollowers = followers && followers.length > 0;

  // navigeerib followeri lehele
  const handleClickUser = (id: string) => {
    router.push(`/protected/user-profile/${id}`);
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow-inner mt-6">
      <h3 className="text-lg font-bold mb-4">Jälgijad</h3>
      <div className="flex items-center space-x-2">
        {/* toggle kas naha followere */}
        <p
          className="text-lg font-medium cursor-pointer"
          onClick={toggleFollowers}
        >
          {hasFollowers ? (
            <>
              {followers.length} Jälgija{followers.length !== 1 ? "t" : ""}
            </>
          ) : (
            "Kasutajal ei ole jälgijaid."
          )}
        </p>
      </div>

      {/* Kui klikid siis naitab followere */}
      {isFollowersVisible && hasFollowers && (
        <ul className="space-y-2 mt-4">
          {followers.map((follower) => (
            <li
              key={follower.follower_id}
              className="text-sm font-medium cursor-pointer text-blue-500 hover:underline"
              onClick={() => handleClickUser(follower.follower_id)}
            >
              {follower.users?.username || "Anonüümne kasutaja"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowersList;

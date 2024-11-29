"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SearchUserButton = ({ users }: { users: any[] }) => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // search username kaudu
  const handleSearch = () => {
    if (!username.trim()) {
      setError("Palun sisestage kasutajanimi.");
      return;
    }

    const foundUser = users.find(
      (user) => user.username?.toLowerCase() === username.toLowerCase()
    );

    if (!foundUser) {
      setError("Kasutajat ei leitud.");
      return;
    }

    setError(""); // reset error
    router.push(`/protected/user-profile/${foundUser.id}`); // navigeerimine searchist
  };

  const handleClickUser = (id: string) => {
    router.push(`/protected/user-profile/${id}`); // navigeerimine listist
  };

  return (
    <div className="mb-4">
      {/* Kasutajate list */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Kasutajad:</h3>
        <ul>
          {users.map((userItem) => (
            <li
              key={userItem.id}
              className="text-lg text-blue-500 cursor-pointer hover:underline"
              onClick={() => handleClickUser(userItem.id)}
            >
              {userItem.username || "Kasutajanimi pole määratud"}
            </li>
          ))}
        </ul>
      </div>

      {/* Username searchbox */}
      <input
        type="text"
        placeholder="Sisesta kasutajanimi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />

      {/* errorid jah */}
      {error && <p className="text-red-500">{error}</p>}

      {/* otsi nupp */}
      <div className="mt-4">
        <Button onClick={handleSearch}>Otsi Kasutajat</Button>
      </div>
    </div>
  );
};

export default SearchUserButton;

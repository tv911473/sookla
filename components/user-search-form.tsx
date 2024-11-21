"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SearchUserButton = ({ users }: { users: any[] }) => {
  const [uid, setUid] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // UID search kui tahad ise otsida
  const handleSearch = () => {
    if (!uid) {
      setError("Palun sisestage UID.");
      return;
    }

    setError(""); // reset error
    router.push(`/protected/user-profile/${uid}`); // route user-profile
  };

  // search kui klikid listis kellegi peal
  const handleClickUser = (id: string) => {
    setUid(id); // UID laheb searchboxi ja kohe searchib
    router.push(`/protected/user-profile/${id}`); // Navigate directly to the user profile page
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
              onClick={() => handleClickUser(userItem.id)} // klikkad siis otsib
            >
              {userItem.username || "Kasutajanimi pole määratud"}
            </li>
          ))}
        </ul>
      </div>

      {/* UID searchbox */}
      <input
        type="text"
        placeholder="Sisesta UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
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

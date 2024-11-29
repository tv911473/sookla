"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SearchUserButton = ({ users }: { users: any[] }) => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
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
    router.push(`/protected/user-profile/${foundUser.id}`);
  };

  // dropdownist kasutaja valimine
  const handleSelectUser = (user: any) => {
    setUsername(user.username);
    setDropdownOpen(false);
    router.push(`/protected/user-profile/${user.id}`);
  };

  return (
    <div className="mb-4 relative">
      {/* Kasutajate dropdown */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Kasutajad:</h3>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="w-full p-2 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-100"
        >
          {username || "Vali kasutaja"}{" "}
        </button>
      </div>

      {/* Dropdown list */}
      {isDropdownOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full shadow-lg max-h-40 overflow-auto">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {user.username || "Kasutajanimi pole määratud"}
            </li>
          ))}
        </ul>
      )}

      {/* Username searchbox */}
      <input
        type="text"
        placeholder="Sisesta kasutajanimi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mt-4"
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

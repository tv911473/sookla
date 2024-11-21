"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ChangeUsernameButton = ({
  email,
  initialUsername,
}: {
  email: string;
  initialUsername: string | null;
}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(initialUsername || "");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!username.trim()) {
      alert("Kasutajanimi ei saa olla tühi!");
      return;
    }

    setLoading(true);
    const supabase = await createClient();

    try {
      const { data, error } = await supabase
        .from("users")
        .update({ username })
        .eq("email", email);

      if (error) throw new Error(error.message);

      alert("Kasutajanimi on edukalt muudetud!");
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      alert("Kasutajanime muutmine ebaõnnestus: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <p className="text-2xl font-bold">
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded"
              placeholder="Sisesta uus kasutajanimi"
            />
          ) : (
            username || "Kasutajanimi pole määratud"
          )}
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="default"
          variant="secondary"
          className="w-full"
        >
          {isEditing ? "Tühista" : "Muuda kasutajanime"}
        </Button>
        {isEditing && (
          <Button
            onClick={handleClick}
            disabled={loading}
            size="default"
            variant="default"
            className="w-full"
          >
            {loading ? "Uuendan..." : "Muuda kasutajanimi"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChangeUsernameButton;

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
    if (email) {
      setLoading(true);
      const supabase = await createClient();

      // Uuendab nime
      const { error } = await supabase.auth.updateUser({
        data: { username },
      });

      setLoading(false);
      if (error) {
        alert("Kasutajanime vahetamine ebaõnnestus: " + error.message);
      } else {
        alert("Kasutajanimi vahetatud!");
        setIsEditing(false);
        router.refresh();
      }
    } else {
      alert("Selle kasutajaga ei ole seotud e-maili.");
    }
  };

  return (
    <div>
      {/* dünaamiline kastike kui nuppu vajutad */}
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
      {/* toggle kas edit v cancel */}
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

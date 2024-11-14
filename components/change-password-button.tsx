"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

const ChangePasswordButton = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleClick = async () => {
    if (email) {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      setLoading(false);
      if (error) {
        alert("Ei saanud saata parooli taastamise e-maili: " + error.message);
      } else {
        alert("Parooli taastamise e-mail saadetud!");
      }
    } else {
      alert("Selle kasutajaga ei ole seotud e-maili.");
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      size="box"
      variant="link"
      className="w-full"
    >
      {loading ? "Saadan..." : "Muuda Parooli"}
    </Button>
  );
};

export default ChangePasswordButton;

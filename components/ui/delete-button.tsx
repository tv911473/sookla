"use client";
import { Button } from "../ui/button";

interface DeleteButtonProps {
  recipeId: number;
  onDelete: (recipeId: number) => void;
}

const DeleteButton = ({ recipeId, onDelete }: DeleteButtonProps) => {
  const handleDelete = () => {
    if (window.confirm("Kas oled kindel, et tahad seda retsepti kustutada?")) {
      onDelete(recipeId);
    }
  };

  return (
    <Button onClick={handleDelete} variant={"default"} size="sm">
      Kustuta
    </Button>
  );
};

export default DeleteButton;

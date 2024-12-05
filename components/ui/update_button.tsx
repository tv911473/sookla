"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const NavigateToUpdateButton = ({ recipeId }: { recipeId: number }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/protected/recipe-update/${recipeId}`);
  };

  return (
    <Button onClick={handleNavigation} variant={"etc"} size="sm">
      Uuenda
    </Button>
  );
};

export default NavigateToUpdateButton;

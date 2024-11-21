"use client";

import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createClient } from "@/utils/supabase/client";

interface LikeButtonProps extends ButtonProps {
  isInitiallyLiked?: boolean;
  recipeId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  isInitiallyLiked = false,
  recipeId,
  className,
  ...props
}) => {
  const supabase = createClient();
  const [liked, setLiked] = React.useState(isInitiallyLiked);
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchSessionAndLikeStatus = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
        return;
      }

      const userId = sessionData?.session?.user?.id || null;
      setUserId(userId);

      if (userId) {
        const { data, error } = await supabase
          .from("liked_recipes")
          .select("published_recipes_id")
          .eq("users_id", userId)
          .eq("published_recipes_id", recipeId);

        if (error) {
          console.error("Error fetching like status:", error.message);
          return;
        }

        setLiked(data && data.length > 0);
      }
    };

    fetchSessionAndLikeStatus();
  }, [recipeId, supabase]);

  const toggleLike = async () => {
    if (!userId) {
      console.error("User is not authenticated, like action cannot proceed.");
      return;
    }

    const newLiked = !liked;
    setLiked(newLiked);

    try {
      if (newLiked) {
        const { data, error } = await supabase.from("liked_recipes").insert({
          published_recipes_id: recipeId,
          users_id: userId,
        });

        if (error) {
          console.error("Error inserting like:", error.message);
          setLiked(!newLiked);
          return;
        }

        console.log("Successfully inserted like:", data);
      } else {
        const { data, error } = await supabase
          .from("liked_recipes")
          .delete()
          .eq("published_recipes_id", recipeId)
          .eq("users_id", userId);

        if (error) {
          console.error("Error deleting like:", error.message);
          setLiked(!newLiked);
          return;
        }

        console.log("Successfully deleted like:", data);
      }
    } catch (error) {
      console.error("Unexpected error during like update:", error);
      setLiked(!newLiked);
    }
  };

  return (
    <Button
      variant="icon"
      size="icon"
      className={cn(
        "flex items-center justify-center transition-colors",
        className
      )}
      onClick={toggleLike}
      {...props}
    >
      <FavoriteIcon
        className={cn(
          "h-6 w-6 transition-colors",
          liked ? "text-red-600" : "text-white"
        )}
        sx={{
          stroke: "black",
          strokeWidth: 1.5,
        }}
      />
    </Button>
  );
};

export { LikeButton };

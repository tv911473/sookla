"use client";

import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface LikeButtonProps extends ButtonProps {
  liked?: boolean;
  onLikeToggle?: () => void;
  isInitiallyLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  isInitiallyLiked = false,
  onLikeToggle,
  className,
  ...props
}) => {
  const [liked, setLiked] = React.useState(isInitiallyLiked);

  const handleToggle = () => {
    setLiked((prevLiked) => !prevLiked);
    if (onLikeToggle) onLikeToggle();
  };

  return (
    <Button
      variant="icon"
      size="icon"
      className={cn(
        "flex items-center justify-center transition-colors",
        className
      )}
      onClick={handleToggle}
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

import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps extends ButtonProps {
  liked?: boolean;
  onLikeToggle?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  liked = false,
  onLikeToggle,
  className,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "flex items-center justify-center transition-colors",
        className
      )}
      onClick={onLikeToggle}
      {...props}
    >
      <FaHeart
        className={cn(
          "h-6 w-6",
          liked ? "text-red-600 stroke-black" : "text-white stroke-black",
          "transition-colors",
          "stroke-2"
        )}
      />
    </Button>
  );
};

export { LikeButton };

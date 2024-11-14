"use client";

import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface FollowButtonProps extends ButtonProps {
  followed?: boolean;
  onFollowToggle?: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  followed = false,
  onFollowToggle,
  className,
  ...props
}) => {
  const [isFollowed, setIsFollowed] = React.useState(followed);

  const handleToggle = () => {
    setIsFollowed((prevFollowed) => !prevFollowed);
    if (onFollowToggle) onFollowToggle();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "flex items-center justify-center transition-colors border border-grey",
        className
      )}
      onClick={handleToggle}
      {...props}
    >
      <p>{isFollowed ? "Following" : "Follow"}</p>
    </Button>
  );
};

export { FollowButton };

"use client";

import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

interface FollowButtonProps extends ButtonProps {
  isInitiallyFollowed?: boolean;
  targetUserId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isInitiallyFollowed = false,
  className,
  targetUserId,
  ...props
}) => {
  const supabase = createClient();
  const [followed, setFollowed] = React.useState(isInitiallyFollowed);
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchSessionAndFollowStatus = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
        return;
      }

      const userId = sessionData?.session?.user?.id || null;
      setUserId(userId);

      if (userId && targetUserId) {
        const { data, error } = await supabase
          .from("followings")
          .select("*")
          .eq("follower_id", userId)
          .eq("following_id", targetUserId);

        if (error) {
          console.error("Error fetching follow status:", error.message);
          return;
        }

        setFollowed(data && data.length > 0);
      }
    };

    fetchSessionAndFollowStatus();
  }, [targetUserId, supabase]);

  const toggleFollow = async () => {
    if (!userId || !targetUserId) {
      console.error("User is not authenticated, follow action cannot proceed.");
      return;
    }

    const newFollowed = !followed;
    setFollowed(newFollowed);

    try {
      if (newFollowed) {
        const { data, error } = await supabase.from("followings").insert({
          follower_id: userId,
          following_id: targetUserId,
        });

        if (error) {
          console.error("Error inserting follow:", error.message);
          setFollowed(!newFollowed);
          return;
        }

        console.log("Successfully inserted follow:", data);
      } else {
        const { data, error } = await supabase
          .from("followings")
          .delete()
          .eq("follower_id", userId)
          .eq("following_id", targetUserId);

        if (error) {
          console.error("Error deleting follow:", error.message);
          setFollowed(!newFollowed);
          return;
        }

        console.log("Successfully deleted follow:", data);
      }

      // Refresh the page after the follow/unfollow action
      window.location.reload();
    } catch (error) {
      console.error("Unexpected error during follow update:", error);
      setFollowed(!newFollowed);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "flex items-center justify-center transition-colors",
        followed ? "bg-custom-grey text-white" : "bg-custom-yellow text-black",
        className
      )}
      onClick={toggleFollow}
      {...props}
    >
      <p>{followed ? "Following" : "Follow"}</p>
    </Button>
  );
};

export { FollowButton };

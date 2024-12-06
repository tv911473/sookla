import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RecipeFeed from "../recipe-feed/page";
import { getAllRecipesAction, getLikedRecipesAction } from "@/app/actions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const allRecipes = await getAllRecipesAction();
  const likedRecipes = await getLikedRecipesAction(user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-12 min-h-screen">
      <div className="flex flex-col gap-2 items-start">
        <RecipeFeed
          initRecipes={allRecipes}
          isLoggedIn={true}
          isLoggedInFilter={true}
          likedRecipeId={likedRecipes}
          userId={user.id}
        />
      </div>
    </div>
  );
}

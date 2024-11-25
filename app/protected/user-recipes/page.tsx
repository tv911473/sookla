import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RecipeFeed from "../../recipe-feed/page";
import { getUserRecipesAction } from "@/app/actions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userRecipes = await getUserRecipesAction(user.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <RecipeFeed
          recipes={userRecipes}
          isLoggedIn={true}
          isUserRecipe={true}
        />
      </div>
    </div>
  );
}

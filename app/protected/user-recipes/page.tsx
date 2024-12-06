import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RecipeFeed from "../../recipe-feed/page";
import { getUserRecipesAction } from "@/app/actions";
import Link from "next/link";

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
      <div className="flex flex-col gap-2 items-start min-h-screen">
        {userRecipes.length === 0 ? (
          <div className="flex-1 w-full flex flex-col gap-2 items-center mt-10">
            <p className="text-xl font-medium">Retseptid puudu</p>
            <Link
              href="/protected/recipe-form"
              className="text-red-500 hover:text-red-700 underline flex flex-col items-center"
            >
              Lisa retsept
            </Link>
          </div>
        ) : (
          <RecipeFeed
            initRecipes={userRecipes}
            isLoggedIn={true}
            isUserRecipe={true}
            isUserPage={true}
            isLoggedInFilter={false}
            userId={""}
          />
        )}
      </div>
    </div>
  );
}

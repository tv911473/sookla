import { Recipe } from "@/types/Recipe";
import { getImageUrl } from "@/utils/supabase/utils";
import Link from "next/link";
import { LikeButton } from "../ui/like-button";
import NavigateToUpdateButton from "../ui/update_button";

interface RecipeCardProps {
  recipe: Recipe;
  isLoggedIn: boolean;
  isInitiallyLiked: boolean;
  isUserRecipe?: boolean;
  isUserPage: boolean;
}

export function RecipeCard({
  recipe,
  isLoggedIn,
  isInitiallyLiked,
  isUserRecipe = false,
  isUserPage,
}: RecipeCardProps) {
  const imageUrl = getImageUrl(recipe.image_url);

  return (
    <div
      key={recipe.id}
      className="flex flex-col justify-between p-4 mb-4 bg-red-100 border rounded-lg shadow-m hover:shadow-lg transition-shadow"
    >
      <Link className="flex flex-col" href={`/recipes/${recipe.id}`}>
        <img
          src={imageUrl}
          alt={recipe.title}
          className="auto-height-img mb-8 rounded-lg"
        />
        <h1 className="text-xl font-semibold">{recipe.title}</h1>
        <br />
      </Link>
      <div className="flex flex-col">
        <div className="flex text-sm text-gray-700">
          Portsjonid: {recipe.servings}
        </div>
        <br />
        <div className="flex text-sm text-gray-700">
          Kategooria: {recipe.categories.category_name}
        </div>
        <br />
        <div className="flex text-sm text-gray-700">
          Valmistusaeg: {recipe.total_time_minutes} minutit
        </div>
        <br />

        {!isUserPage && (
          <div className="flex text-sm text-gray-700 font-light italic">
            Postitas: {recipe.users.username}
          </div>
        )}
      </div>
      {!isUserRecipe && isLoggedIn && (
        <div>
          <LikeButton
            recipeId={recipe.id}
            isInitiallyLiked={isInitiallyLiked}
          />
        </div>
      )}

      {isUserRecipe && (
        <div className="mt-2">
          <NavigateToUpdateButton recipeId={(recipe.id)} />
        </div>
      )}
    </div>
  );
}

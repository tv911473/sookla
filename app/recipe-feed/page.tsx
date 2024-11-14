import { getAllRecipesAction } from "@/app/actions";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/Recipe";

export default async function RecipeFeed() {
  const recipedata = await getAllRecipesAction();
  const recipes = recipedata || [];

  return (
    <div className="px-4 py-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}

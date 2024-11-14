import { getAllRecipesAction } from "@/app/actions";
import { RecipeCard } from "@/components/recipes/RecipeCard";

interface RecipeFeedProps {
  userId: string;
}

export default async function RecipeFeed({ userId }: RecipeFeedProps) {
  const recipedata = await getAllRecipesAction(userId); // Pass userId to the action
  const recipes = recipedata || [];

  return (
    <div className="px-4 py-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}

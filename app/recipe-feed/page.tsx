import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/Recipe";

interface RecipeFeedProps {
  recipes: Recipe[];
  isLoggedIn: boolean;
}

export default function RecipeFeed({ recipes, isLoggedIn }: RecipeFeedProps) {
  return (
    <div className="px-4 py-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} isLoggedIn={isLoggedIn} />
        ))}
      </ul>
    </div>
  );
}

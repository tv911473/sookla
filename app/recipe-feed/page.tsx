"use client";
import CategoryFilter from "@/components/recipes/CategoryFilter";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/Recipe";
import { useEffect, useState } from "react";
import { getCateories } from "../actions";
import { deleteRecipe } from "../actions";

interface RecipeFeedProps {
  recipes: Recipe[];
  likedRecipeId?: number[];
  isLoggedIn: boolean;
  isUserRecipe?: boolean;
  isUserPage?: boolean;
}

export default function RecipeFeed({
  recipes,
  isLoggedIn,
  likedRecipeId = [],
  isUserRecipe = false,
  isUserPage = false,
}: RecipeFeedProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [categories, setCategories] = useState<{ category_name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCateories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleFilterChange = (selectedCategories: string[]) => {
    if (selectedCategories.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      const updatedRecipes = recipes.filter((recipe) => {
        return selectedCategories.includes(recipe.categories.category_name);
      });
      setFilteredRecipes(updatedRecipes);
    }
  };

const handleDelete = async (recipeId: number) => {
  console.log("Attempting to delete recipe with ID:", recipeId);
  try {
    const result = await deleteRecipe(recipeId);
    if (result) {
      console.log("Recipe deleted successfully");
      setFilteredRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } else {
      console.error("Failed to delete recipe"); 
    }
  } catch (error) {
    console.error("Error during delete process:", error);
  }
};


  return (
    <div className="px-4">
      <CategoryFilter
        onFilterChange={handleFilterChange}
        categories={categories}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isLoggedIn={isLoggedIn}
            isInitiallyLiked={likedRecipeId.includes(recipe.id)}
            isUserRecipe={isUserRecipe}
            isUserPage={isUserPage}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

"use client";
import CategoryFilter from "@/components/recipes/CategoryFilter";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/Recipe";
import { useEffect, useState } from "react";
import { getCateories, getFollowedUsersRecipes } from "../actions";
import UserFilter from "@/components/recipes/UserFilter";
import { deleteRecipe } from "../actions";

interface RecipeFeedProps {
  recipes: Recipe[];
  likedRecipeId?: number[];
  isLoggedIn: boolean;
  userId: string;
  isUserRecipe?: boolean;
  isUserPage?: boolean;
}

export default function RecipeFeed({
  recipes,
  isLoggedIn,
  likedRecipeId = [],
  userId,
  isUserRecipe = false,
  isUserPage = false,
}: RecipeFeedProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [categories, setCategories] = useState<{ category_name: string }[]>([]);
  const [followings, setFollowings] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedUserFilters, setSelectedUserFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCateories();
      setCategories(fetchedCategories);

      const fetchedFollowings = await getFollowedUsersRecipes(userId);
      console.log("Followings:", fetchedFollowings);
      setFollowings(fetchedFollowings);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updatedRecipes = recipes.filter((recipe) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(recipe.categories.category_name);

      const userMatch =
        selectedUserFilters.length === 0 ||
        (selectedUserFilters.includes("liked") &&
          likedRecipeId.includes(recipe.id)) ||
        (selectedUserFilters.includes("followed") &&
          followings.includes(recipe.users_id));

      return categoryMatch && userMatch;
    });

    setFilteredRecipes(updatedRecipes);
  }, [selectedCategories, selectedUserFilters, recipes, likedRecipeId, followings]);

  const handleCategoryFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleUserFilterChange = (filters: string[]) => {
    setSelectedUserFilters(filters);
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
      <div className="flex flex-row items-center gap-20 mt-10 mb-20">
        <div>
        <CategoryFilter
          onCategoryChange={handleCategoryFilterChange}
          categories={categories}
        />
        </div>
        {isLoggedIn && (
          <div>
          <UserFilter
            onFilterChange={handleUserFilterChange}
            isLoggedIn={isLoggedIn}
          ></UserFilter>
          </div>
        )}
      </div>
      {filteredRecipes.length === 0 ? (
        <div className="min-h-[300px] flex items-center justify-center mt-10">
          <div className="text-black text-2xl	">Vastavad retseptid puuduvad</div>
        </div>
      ) : (
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
       )}
    </div>
  );
}

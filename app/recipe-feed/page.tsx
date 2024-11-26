"use client";
import CategoryFilter from "@/components/recipes/CategoryFilter";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/Recipe";
import { useEffect, useState } from "react";
import { getCateories, getFollowedUsersRecipes } from "../actions";
import UserFilter from "@/components/recipes/UserFilter";

interface RecipeFeedProps {
  recipes: Recipe[];
  likedRecipeId?: number[];
  isLoggedIn: boolean;
  userId: string;
}

export default function RecipeFeed({
  recipes,
  isLoggedIn,
  likedRecipeId = [],
  userId,
}: RecipeFeedProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [categories, setCategories] = useState<{ category_name: string }[]>([]);
  const [followings, setFollowings] = useState<string[]>([]);

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

  const handleCategoryFilterChange = (selectedCategories: string[]) => {
    if (selectedCategories.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      const updatedRecipes = recipes.filter((recipe) => {
        return selectedCategories.includes(recipe.categories.category_name);
      });
      setFilteredRecipes(updatedRecipes);
    }
  };

  const handleUserFilterChange = (selectedFilters: string[]) => {
    if (selectedFilters.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      const updatedRecipes = recipes.filter((recipe) => {
        return (
          (selectedFilters.includes("liked") && likedRecipeId.includes(recipe.id)) ||
          (selectedFilters.includes("followed") && followings.includes(recipe.users_id))
        );
      });
      setFilteredRecipes(updatedRecipes);
      console.log("Filtered Recipes:", updatedRecipes);
    }
  };
  return (
    <div className="px-4">
      <CategoryFilter
        onCategoryChange={handleCategoryFilterChange}
        categories={categories}
      />
      {isLoggedIn && (
        <UserFilter
          onFilterChange={handleUserFilterChange}
          isLoggedIn={isLoggedIn}
        ></UserFilter>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isLoggedIn={isLoggedIn}
            isInitiallyLiked={likedRecipeId.includes(recipe.id)}
          />
        ))}
      </ul>
    </div>
  );
}

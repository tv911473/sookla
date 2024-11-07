import { getAllRecipesAction } from "@/app/actions";
import { Key } from "react";

export default async function RecipeFeed() {
  const recipedata = await getAllRecipesAction();
  console.log(recipedata);
  return (
    <>
      <ul>
        {recipedata &&
          recipedata.map((recipe) => (
            <li key={recipe.id}>
              <h1>{recipe.title}</h1>
              <br />
              <span>Portsjonid: {recipe.servings}</span>
              <br />
              <span>Kategooria: {recipe.categories.category_name}</span>
              <br />
              <span>Valmistusaeg: {recipe.total_time_minutes} minutit</span>
              <br />
              <span>
                Koostisosad:
                {recipe.ingredients.ingredient_text
                  .split(",")
                  .map((ingredient: string) => (
                    <ol>{ingredient.trim()}</ol>
                  ))}
              </span>
              <br />
              <span>{recipe.steps_description}</span>
              <br />
            </li>
          ))}
      </ul>
    </>
  );
}

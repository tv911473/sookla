import { getAllRecipesAction } from "@/app/actions";

export default async function RecipeFeed() {
  const recipedata = await getAllRecipesAction();
  console.log(recipedata);
  return (
    <>
      <ul>
      {recipedata && recipedata.map((recipe) => (
        <li key={recipe.id}>
          <span>{recipe.title}</span>

        </li>
      ))}
    </ul>
    </>
  );
}

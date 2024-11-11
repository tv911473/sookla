import { Recipe } from "@/types/Recipe";

export function BigRecipeCard({ recipe }: { recipe: Recipe }) {
  const placeholderImage = "https://via.placeholder.com/150"; 
  
  return (
    <li key={recipe.id} className="p-4 mb-4 border rounded-lg shadow-md">
      <img
        src={placeholderImage}
        alt={recipe.title}
        className="w-full h-40 object-cover mb-4 rounded-lg"
      />
      <h1 className="text-xl font-semibold">{recipe.title}</h1>
      <br />
      <span className="block text-sm text-gray-700">Portsjonid: {recipe.servings}</span>
      <br />
      {/* <span className="block text-sm text-gray-700">Kategooria: {recipe.categories.category_name}</span> */}
      <br />
      <span className="block text-sm text-gray-700">Valmistusaeg: {recipe.total_time_minutes} minutit</span>
      <br />
      <span className="block text-sm text-gray-700">
        Koostisosad:
        {/* <ol className="list-decimal pl-5">
          {recipe.ingredients.ingredient_text
            .split(",")
            .map((ingredient: string) => (
              <li className="text-sm text-gray-600">{ingredient.trim()}</li>
            ))}
        </ol> */}
      </span>
      <br />
      <span className="block text-sm text-gray-700">Valmistusjuhend: </span>
      <span className="block text-sm text-gray-700">{recipe.steps_description}</span>
    </li>
  );
}

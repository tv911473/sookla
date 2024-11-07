import { Recipe } from "@/types/Recipe";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
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
      <div className="flex flex-wrap flex-col">
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
      </div>
    </li>
  );
}

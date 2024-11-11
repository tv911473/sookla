import { Recipe } from "@/types/Recipe";
import Link from "next/link";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <Link
      key={recipe.id}
      href={`/recipes/${recipe.id}`}
      className="flex flex-col justify-between p-4 mb-4 bg-red-100 border shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col">
        <img
          src={placeholderImage}
          alt={recipe.title}
          className="w-full h-40 object-cover mb-4 rounded-lg"
        />
        <h1 className="text-xl font-semibold">{recipe.title}</h1>
        <br />
      </div>
      <div className="flex flex-col">
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
        <br />

        <div className="flex text-sm text-gray-700 font-light italic">
          Postitas: {recipe.users_id}
        </div>
      </div>
    </Link>
  );
}

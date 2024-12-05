import { Recipe } from "@/types/Recipe";
import { getImageUrl } from "@/utils/supabase/utils";
import Link from "next/link";

export function BigRecipeCard({ recipe }: { recipe: Recipe }) {
  const imageUrl = getImageUrl(recipe.image_url);

  return (
    <div
      key={recipe.id}
      className="p-12 mb-12 border shadow-xl bg-white rounded-lg w-full mx-auto"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-start mr-10">
          <div className="text-5xl font-semibold mb-4 text-gray-800">
            {recipe.title}
          </div>
          <div className="text-lg text-gray-700 font-light italic mb-6">
            Postitas:{" "}
            <Link
              className="text-red-500 underline hover:no-underline hover:text-red-700"
              href={`/protected/user-profile/${recipe.users_id}`}
            >
              {recipe.users.username}
            </Link>
          </div>
          <div>
            <div className="text-xl text-gray-700">
              <strong>Koostisosad:</strong>
            </div>
            <div className="text-xl text-gray-700">
              <ol className="list-decimal pl-8 space-y-2">
                {recipe.ingredients.ingredient_text
                  .split(",")
                  .map((ingredient: string, index: number) => (
                    <li key={index} className="text-gray-600">
                      {ingredient.trim()}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
        <div>
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-80 h-80 object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col my-10">
        <div className="text-xl text-gray-700">
          <strong>Valmistusjuhend:</strong>
        </div>
        <div className="text-xl text-gray-700">{recipe.steps_description}</div>
      </div>
      <div className="text-lg text-gray-700 font-light italic">
        Viimati muudetud:{" "}
        {new Intl.DateTimeFormat("et-EE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(recipe.time_of_creation))}
      </div>
    </div>
  );
}

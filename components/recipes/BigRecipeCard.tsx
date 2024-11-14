import { Recipe } from "@/types/Recipe";

export function BigRecipeCard({ recipe }: { recipe: Recipe }) {
  const placeholderImage = "https://via.placeholder.com/600";

  return (
    <div
      key={recipe.id}
      className="p-12 mb-12 border shadow-xl bg-red-100 rounded-lg w-full mx-auto"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-start mr-10">
          <div className="text-5xl font-semibold mb-6 text-gray-800">
            {recipe.title}
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
            src={placeholderImage}
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
    </div>
  );
}
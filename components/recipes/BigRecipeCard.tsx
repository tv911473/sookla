import { Recipe } from "@/types/Recipe";

export function BigRecipeCard({ recipe }: { recipe: Recipe }) {
  const placeholderImage = "https://via.placeholder.com/600";

  return (
    <div
      key={recipe.id}
      className="p-12 mb-12 border shadow-xl bg-red-100 rounded-lg max-w-5xl mx-auto"
    >
      <div className="flex flex-col items-center">
        <img
          src={placeholderImage}
          alt={recipe.title}
          className="w-full h-96 object-cover mb-8 rounded-lg"
        />
        <h1 className="text-5xl font-semibold text-center mb-6 text-gray-800">
          {recipe.title}
        </h1>
      </div>

      <div className="space-y-6">
        <div className="text-xl text-gray-700">
          <strong>Portsjonid:</strong> {recipe.servings}
        </div>
        <div className="text-xl text-gray-700">
          <strong>Kategooria:</strong> {recipe.categories.category_name}
        </div>
        <div className="text-xl text-gray-700">
          <strong>Valmistusaeg:</strong> {recipe.total_time_minutes} minutit
        </div>

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

        <div className="text-xl text-gray-700">
          <strong>Valmistusjuhend:</strong>
        </div>
        <div className="text-xl text-gray-700">
          {recipe.steps_description}
        </div>
      </div>
    </div>
  );
}


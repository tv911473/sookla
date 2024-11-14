import { Recipe } from "@/types/Recipe";
import { createClient } from "@/utils/supabase/client";

export function BigRecipeCard({ recipe }: { recipe: Recipe }) {
  const placeholderImage =
    "https://emetryzjnikmcwiqgjtv.supabase.co/storage/v1/object/sign/recipe-images/recipe-images/placeholder.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyZWNpcGUtaW1hZ2VzL3JlY2lwZS1pbWFnZXMvcGxhY2Vob2xkZXIuanBnIiwiaWF0IjoxNzMxNTgwNzkxLCJleHAiOjQ4ODUxODA3OTF9.1Om_GT3KYIRmLcddDezKQlsG4Mz9SMwPhnuIdBgsyLQ&t=2024-11-14T10%3A39%3A56.389Z";
  const supabase = createClient();
  const imagePath = recipe.image_url
  const getImageUrl = (path: string) => {
    if (!path) {
      return placeholderImage;
    }

    const { data } = supabase.storage.from("recipe-images").getPublicUrl(path);

    if (data == null) {
      return placeholderImage; 
    }

    return data.publicUrl || placeholderImage;
  };

  const imageUrl = getImageUrl(imagePath);

  console.log(imageUrl)

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
    </div>
  );
}

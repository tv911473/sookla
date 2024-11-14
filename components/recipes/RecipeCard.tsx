import { Recipe } from "@/types/Recipe";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
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
  return (
    <Link
      key={recipe.id}
      href={`/recipes/${recipe.id}`}
      className="flex flex-col justify-between p-4 mb-4 bg-red-100 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="auto-height-img mb-8 rounded-lg"
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

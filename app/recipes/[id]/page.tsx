import { getSingleRecipe } from "@/app/actions";
import { BigRecipeCard } from "@/components/recipes/BigRecipeCard";

type SingleRecipeProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function SingleRecipe({ params }: SingleRecipeProps) {
  const { id } = await params;

  const recipe = await getSingleRecipe(id);

  if (!recipe) {
    return <div>Retsepti ei leitud!</div>;
  }

  return (
    <div className="px-4 py-6 w-[1000px]">
      <BigRecipeCard recipe={recipe} />
    </div>
  );
}

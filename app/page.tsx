import Hero from "@/components/hero";
import RecipeFeed from "./recipe-feed/page";
import { getAllRecipesAction } from "./actions";

export default async function Index() {
  const allRecipes = await getAllRecipesAction();

  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex-1 w-full flex flex-col gap-12">
          <div className="flex flex-col gap-2 items-start">
            <RecipeFeed recipes={allRecipes} isLoggedIn={false} userId={""} />
          </div>
        </div>
      </main>
    </>
  );
}

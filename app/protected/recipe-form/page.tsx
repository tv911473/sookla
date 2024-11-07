"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

type Category = {
  id: number;
  category_name: string;
};

export default function RecipeForm() {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [servings, setServings] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);
  const [stepsDescription, setStepsDescription] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("id, category_name");

        if (error) {
          console.error("Error fetching categories:", error);
          throw error;
        }

        setCategories(data || []);
      } catch (err) {
        console.error("Error in fetchCategories function:", err);
      }
    };

    fetchCategories();
  }, []);

  const addIngredient = async (ingredientName: string) => {
    if (!ingredientName.trim()) {
      console.error("Ingredient name cannot be empty.");
      return null;
    }

    const { data, error } = await supabase
      .from("ingredients")
      .insert({ ingredient_text: ingredientName })
      .select("id")
      .single();

    if (error) {
      console.error("Error adding ingredient:", error.message);
      return null;
    }

    console.log("Ingredient added:", data);
    return data?.id;
  };

  const addRecipe = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !selectedCategory) {
      console.error("Title and category are required.");
      return;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error fetching session:", sessionError.message);
      return;
    }

    const userId = sessionData?.session?.user?.id;
    if (!userId) {
      console.error("User must be logged in to submit a recipe.");
      return;
    }

    const ingredientId = await addIngredient(ingredientName);
    if (!ingredientId) {
      console.error("Failed to add ingredient.");
      return;
    }

    const { data, error } = await supabase.from("published_recipes").insert([
      {
        title,
        servings,
        categories_id: parseInt(selectedCategory),
        total_time_minutes: totalTimeMinutes,
        ingredients_id: ingredientId,
        steps_description: stepsDescription,
        time_of_creation: new Date().toISOString(),
        users_id: userId, // Attach user ID here
      },
    ]);

    if (error) {
      console.error("Error adding recipe:", error);
    } else {
      console.log("Recipe added successfully:", data);

      // Clear form fields
      setTitle("");
      setIngredientName("");
      setServings(0);
      setSelectedCategory("");
      setTotalTimeMinutes(0);
      setStepsDescription("");
    }
  };

  return (
    <form onSubmit={addRecipe}>
      <Label htmlFor="title">Pealkiri</Label>
      <Input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label htmlFor="ingredientName">Koostisosa</Label>
      <Input
        id="ingredientName"
        type="text"
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
      />

      <Label htmlFor="servings">Portsjonite arv</Label>
      <Input
        id="servings"
        type="number"
        value={servings}
        onChange={(e) => setServings(parseInt(e.target.value))}
      />

      <Label htmlFor="categories"></Label>
      <select
        id="categories"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Vali kategooria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
        <br></br>
      <Label htmlFor="totalTimeMinutes">Valmistusaeg (minutites)</Label>
      <Input
        id="totalTimeMinutes"
        type="number"
        value={totalTimeMinutes}
        onChange={(e) => setTotalTimeMinutes(parseInt(e.target.value))}
      />

      <Label htmlFor="stepsDescription">Valmistusjuhend</Label>
      <Input
        id="stepsDescription"
        type="text"
        value={stepsDescription}
        onChange={(e) => setStepsDescription(e.target.value)}
      />

      <button type="submit">Postita</button>
    </form>
  );
}

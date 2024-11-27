"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Alert } from "flowbite-react";

type Category = {
  id: number;
  category_name: string;
};

type Ingredient = {
  name: string;
  quantity: string;
};

export default function UpdateRecipeForm() {
  const supabase = createClient();
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [servings, setServings] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);
  const [stepsDescription, setStepsDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "" },
  ]);
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const { data: recipe, error: recipeError } = await supabase
        .from("published_recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (recipeError) {
        console.error("Error fetching recipe:", recipeError);
        return;
      }

      const recipeOwnerId = recipe.users_id; 

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.id !== recipeOwnerId) {
        router.push("/protected/user-recipes"); 
        return;
      }

      setTitle(recipe.title);
      setServings(recipe.servings);
      setSelectedCategory(recipe.categories_id);
      setTotalTimeMinutes(recipe.total_time_minutes);
      setStepsDescription(recipe.steps_description);

      if (recipe.image_url) {
        setExistingImageUrl(recipe.image_url); 
      }

      const ingredientIds = recipe.ingredients_id;

      if (ingredientIds) {
        const { data: ingredientsData, error: ingredientsError } =
          await supabase
            .from("ingredients")
            .select("ingredient_text")
            .in(
              "id",
              Array.isArray(ingredientIds) ? ingredientIds : [ingredientIds]
            );

        if (ingredientsError) {
          console.error("Error fetching ingredients:", ingredientsError);
          return;
        }

        const mappedIngredients = ingredientsData.map((ingredient) => {
          const ingredientList = ingredient.ingredient_text
            .split(",")
            .map((ingredient: string) => ingredient.trim());

          return ingredientList.map((item: string) => {
            const match = item.match(/^(.+?)\s+(\d+(\.\d+)?\s*\w+)$/);

            if (match) {
              const [, name, quantity] = match;
              return {
                name: name.trim(),
                quantity: quantity.trim(),
              };
            } else {
              return {
                name: item.trim(),
                quantity: "",
              };
            }
          });
        });

        setIngredients(mappedIngredients.flat());
      } else {
        setIngredients([{ name: "", quantity: "" }]);
      }
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }

      setCategories(data || []);
    };

    fetchRecipeData();
    fetchCategories();
  }, [id]);

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredientField = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  const getCroppedImageURL = (): Promise<string | null> => {
    return new Promise((resolve) => {
      const cropper = cropperRef.current?.cropper;
      if (cropper) {
        resolve(cropper.getCroppedCanvas().toDataURL());
      } else {
        resolve(null);
      }
    });
  };

  const uploadImage = async (croppedImageURL: string | null) => {
    if (!croppedImageURL) {
      console.error("No cropped image available");
      return null;
    }

    const blob = await (await fetch(croppedImageURL)).blob();
    const fileExtension = image?.name.split(".").pop();
    const filePath = `recipe-images/${Date.now()}.${fileExtension}`;

    try {
      const { data, error } = await supabase.storage
        .from("recipe-images")
        .upload(filePath, blob);

      if (error) {
        console.error("Error uploading image:", error.message);
        return null;
      }

      return data?.path;
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    }
  };

  const deleteExistingImage = async () => {
    if (existingImageUrl) {
      try {
        const { error } = await supabase.storage
        .from("recipe-images")
        .remove([existingImageUrl]);

        if (error) {
          console.error("Error deleting existing image:", error.message);
        } else {
          console.log("Existing image deleted successfully")
        }
      } catch (err) {
        console.error("Error during image deletion:", err);
      }
    }
  }

  const validateForm = () => {
    const missingFields = [];
    if (!title) missingFields.push("Pealkiri");
    if (
      ingredients.some((ingredient) => !ingredient.name || !ingredient.quantity)
    ) {
      missingFields.push("Koostisosa ja kogus");
    }
    if (!servings) missingFields.push("Portsjonite arv");
    if (!selectedCategory) missingFields.push("Kategooria");
    if (!totalTimeMinutes) missingFields.push("Valmistusaeg");
    if (!stepsDescription) missingFields.push("Valmistusjuhend");

    if (missingFields.length > 0) {
      setErrors(missingFields);
      return false;
    }

    setErrors([]);
    return true;
  };

  const updateRecipe = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    let imagePath = existingImageUrl;

    if (image) {
      
      await deleteExistingImage();
      
      const croppedImageURL = await getCroppedImageURL();
      const uploadedPath = await uploadImage(croppedImageURL);
      imagePath = uploadedPath || existingImageUrl; 
    }

    const ingredientText = ingredients
      .map((ingredient) => `${ingredient.name} ${ingredient.quantity}`)
      .join(", ");

    const { data, error } = await supabase
      .from("published_recipes")
      .select("ingredients_id")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching recipe ingredients_id:", error);
      return;
    }

    const ingredientsId = data?.ingredients_id;

    if (!ingredientsId) {
      console.error("No ingredients_id found for this recipe.");
      return;
    }

    const { error: ingredientUpdateError } = await supabase
      .from("ingredients")
      .update({ ingredient_text: ingredientText })
      .eq("id", ingredientsId);

    if (ingredientUpdateError) {
      console.error("Error updating ingredient:", ingredientUpdateError);
      return;
    }

    const { error: recipeUpdateError } = await supabase
      .from("published_recipes")
      .update({
        title,
        servings,
        categories_id: parseInt(selectedCategory),
        total_time_minutes: totalTimeMinutes,
        steps_description: stepsDescription,
        image_url: imagePath,
        time_of_creation: new Date().toISOString(),
      })
      .eq("id", id);

    if (recipeUpdateError) {
      console.error("Error updating recipe:", recipeUpdateError);
      return;
    }

    router.push("/protected/user-recipes");
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      {errors.length > 0 && (
        <Alert color="red" onDismiss={() => setErrors([])} className="mb-4">
          <span className="font-medium">Palun täida järgmised väljad:</span>
          <ul className="mt-2 ml-4 list-disc list-inside text-sm text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
      <form
        onSubmit={updateRecipe}
        className="p-12 mb-12 mt-10 border shadow-xl bg-red-100 rounded-lg w-[750px] mx-auto"
      >
        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="block text-lg font-medium text-black"
          >
            Pealkiri
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            maxLength={30}
          />
        </div>

        <div className="space-y-2">
          <Label className="block text-lg font-medium text-black">
            Koostisosad
          </Label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Koostisosa nimi"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
              />
              <Input
                type="text"
                placeholder="Kogus"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => removeIngredientField(index)}
                className="p-2 font-semibold text-white text-sm bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Eemalda
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredientField}
            className="w-full py-2 px-2 font-semibold text-white text-sm bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
          >
            Lisa koostisosa
          </button>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="servings"
            className="block text-lg font-medium text-black"
          >
            Portsjonite arv
          </Label>
          <select
            id="servings"
            value={servings}
            onChange={(e) => setServings(parseInt(e.target.value))}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Vali portsjonite arv</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="categories"
            className="block text-lg font-medium text-black"
          >
            Kategooria
          </Label>
          <select
            id="categories"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Vali kategooria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="totalTimeMinutes"
            className="block text-lg font-medium text-black"
          >
            Valmistusaeg (minutites)
          </Label>
          <Input
            id="totalTimeMinutes"
            type="number"
            min={0}
            value={totalTimeMinutes}
            onChange={(e) => setTotalTimeMinutes(parseInt(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="stepsDescription"
            className="block text-lg font-medium text-black"
          >
            Valmistusjuhend
          </Label>
          <textarea
            id="stepsDescription"
            value={stepsDescription}
            onChange={(e) => setStepsDescription(e.target.value)}
            rows={6}
            cols={5}
            className="w-full p-2 border rounded-md"
            maxLength={2000}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="image"
            className="block text-lg font-medium text-black"
          >
            Retsepti pilt
          </Label>
          {existingImageUrl && !image && (
            <div className="my-4">
              <img
                src={`https://emetryzjnikmcwiqgjtv.supabase.co/storage/v1/object/public/recipe-images/${existingImageUrl}`}
                alt="Existing Recipe Image"
                className="w-full max-w-xs rounded-md"
              />
            </div>
          )}

          <Label
            htmlFor="image"
            className="block text-lg font-medium text-black"
          >
            Lisa uus pilt
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {image && (
          <div className="my-4">
            <Cropper
              src={URL.createObjectURL(image)}
              style={{
                height: "auto",
                width: "100%",
                maxWidth: "400px",
                maxHeight: "400px",
                borderRadius: "8px",
              }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              ref={cropperRef}
              viewMode={1}
              minContainerWidth={400}
              minContainerHeight={400}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 mt-4 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
        >
          Uuenda retsept
        </button>
      </form>
    </div>
  );
}

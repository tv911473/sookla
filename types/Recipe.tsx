import { UUID } from "crypto";

export type Recipe = {
  id: number;
  title: string;
  servings: number;
  categories_id: number;
  categories: { category_name: string };
  total_time_minutes: number;
  ingredients_id: number;
  ingredients: { ingredient_text: string };
  steps_description: string;
  time_of_creation: Date;
  users_id: UUID;
};

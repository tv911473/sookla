import { UUID } from "crypto";

export type Recipe = {
  id: number;
  title: string;
  servings: number;
  categories_id: number;
  ingredients_id: number;
  steps_description: string;
  time_of_creation: Date;
  users_id: UUID;
};
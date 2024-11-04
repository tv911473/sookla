import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Form from "next/form";

export default async function RecipeForm() {
  return (
    <Form action="post">
      <Label htmlFor="title">Pealkiri</Label>
      <Input id="title" type="text" />
    </Form>
  );
}

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const placeholderImage =
  "https://emetryzjnikmcwiqgjtv.supabase.co/storage/v1/object/sign/recipe-images/recipe-images/placeholder.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyZWNpcGUtaW1hZ2VzL3JlY2lwZS1pbWFnZXMvcGxhY2Vob2xkZXIuanBnIiwiaWF0IjoxNzMxNTgwNzkxLCJleHAiOjQ4ODUxODA3OTF9.1Om_GT3KYIRmLcddDezKQlsG4Mz9SMwPhnuIdBgsyLQ&t=2024-11-14T10%3A39%3A56.389Z";

export const getImageUrl = (path: string) => {
  if (!path) {
    return placeholderImage;
  }

  const { data } = supabase.storage.from("recipe-images").getPublicUrl(path);

  if (data == null) {
    return placeholderImage; 
  }

  return data.publicUrl || placeholderImage;
};
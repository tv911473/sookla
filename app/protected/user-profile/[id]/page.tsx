import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import BackButton from "@/components/back-button";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const supabase = await createClient();

  // kasutaja otsimine id jargi
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  // Hetkel pole tabelis created_at fieldi seega ehk hakkab toole kui lisada
  const formattedDate = new Date(data.created_at).toLocaleDateString("en-GB");

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      {/* Profiilipilt */}
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4">
        <img
          src="path/to/profile-picture"
          alt="Profiilipilt"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      {/* Kasutaja andmed */}
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow-inner space-y-4">
        <div>
          <p className="text-sm text-gray-500">Kasutajanimi:</p>
          <p className="text-lg font-medium">
            {data.username || "Kasutajanimi pole määratud"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">E-mail:</p>
          <p className="text-lg font-medium">{data.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Kasutaja ID:</p>
          <p className="text-lg font-medium">{data.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Liitumiskuupäev:</p>
          <p className="text-lg font-medium">{formattedDate}</p>
        </div>
      </div>

      {/* Tagasi nupp */}
      <BackButton />
    </div>
  );
}

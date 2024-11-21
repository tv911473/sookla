import { createClient } from "@/utils/supabase/server";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // id laheb labi URLi, saab panna ka ilmselt mingi otsingu ja search asja lehele endale
  const supabase = await createClient();

  // kasutaja otsimine id jargi
  const { data: user, error } = await supabase
    .from("users") // public.users supabase
    .select("*")
    .eq("id", id) // id = await params koht
    .single();

  console.log("Küsi kasutajat ID-ga:", id);

  if (!user) {
    return <p>Kasutajat ei leitud või toimus viga.</p>;
  }

  // Hetkel pole tabelis created_at fieldi seega ehk hakkab toole kui lisada
  const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB");

  const username = user.username || "Kasutajanimi pole määratud";

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

      {/* Kasutajanimi */}
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow-inner space-y-4">
        <div>
          <p className="text-sm text-gray-500">Kasutajanimi:</p>
          <p className="text-lg font-medium">{username}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">E-mail:</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Kasutaja ID:</p>
          <p className="text-lg font-medium">{user.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Liitumiskuupäev:</p>
          <p className="text-lg font-medium">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

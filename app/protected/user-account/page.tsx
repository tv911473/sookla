import { createClient } from "@/utils/supabase/server";
import ChangePasswordButton from "@/components/change-password-button";
import ChangeUsernameButton from "@/components/change-username-button";

export default async function UserAccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Sa pead olema sisse logitud et näha seda lehte.</p>;
  }

  // Fetch user data from the public.users table to get the username
  const { data: userData, error } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (error || !userData) {
    return <p>Kasutaja andmeid ei leitud.</p>;
  }

  const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB");
  const username = userData.username || "Kasutajanimi pole määratud";

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      {/* profiilipilt kui tahame lisada siis on koht olemas */}
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4">
        <img
          src="path/to/profile-picture"
          alt="Konto Profiilipilt"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Muuda kasutajanime */}
      <ChangeUsernameButton
        email={user.email as string}
        initialUsername={username}
      />

      {/* Konto info */}
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
          <p className="text-sm text-gray-500">Kasutaja alates:</p>
          <p className="text-lg font-medium">{formattedDate}</p>
        </div>

        {/* muuda parooli nupp */}
        <ChangePasswordButton email={user.email as string} />
      </div>

      {/* retseptide osa kui tahame lisada, tegin lihtsalt figma järgi */}
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow-inner mt-6">
        <p className="text-lg font-medium">
          Loodud retseptid ja nende statistika
        </p>
      </div>
    </div>
  );
}

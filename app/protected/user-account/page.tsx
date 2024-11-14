// pages/protected/user-account.tsx
import { createClient } from "@/utils/supabase/server";
import ChangePasswordButton from "@/components/change-password-button";

export default async function UserAccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Sa pead olema sisse logitud et näha seda lehte.</p>;
  }

  const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB");
  const username = user.user_metadata?.username || "Kasutajanimi pole määratud";

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      {/* profile pic */}
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4">
        {/* mdea kas kasutame profiilipilti, igastahes voimalik on */}
        <img
          src="path/to/profile-picture"
          alt="Konto Profiilipilt"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* kasutajanimi */}
      <h2 className="text-2xl font-bold mb-4">{username}</h2>

      {/* konto asjad */}
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow-inner space-y-4">
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
        {/* change pw nupp */}
        <ChangePasswordButton email={user.email as string} />
      </div>

      {/* retseptide koht */}
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow-inner mt-6">
        <p className="text-lg font-medium">
          Loodud retseptid ja nende statistika
        </p>
        {/* retseptide loogika */}
      </div>
    </div>
  );
}

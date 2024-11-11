import { createClient } from "@/utils/supabase/server";

export default async function UserAccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Sa pead olema sisse logitud et näha seda lehte.</p>;
  }

  const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB");

  const username = user.user_metadata?.username || "Kasutajanimi pole määratud"; // Default if no username

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Konto</h1>
      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-500">Email:</p>
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
        <div>
          <p className="text-sm text-gray-500">Kasutajanimi:</p>
          <p className="text-lg font-medium">{username}</p>
        </div>
      </div>
    </div>
  );
}

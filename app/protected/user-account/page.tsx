import { createClient } from "@/utils/supabase/server";
import ChangePasswordButton from "@/components/change-password-button";
import ChangeUsernameButton from "@/components/change-username-button";
import FollowersList from "@/components/followers-list";

export default async function UserAccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Sa pead olema sisse logitud et näha seda lehte.</p>;
  }

  const { data: userData, error } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  if (error || !userData) {
    return <p>Kasutaja andmeid ei leitud.</p>;
  }

  //const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB");
  const username = userData.username || "Kasutajanimi pole määratud";

  // Fetch followers
  const { data: followersData, error: followersError } = await supabase
    .from("followings")
    .select("follower_id, users!fk_follower(username)")
    .eq("following_id", user.id)
    .order("created_at", { ascending: false });

  if (followersError) {
    console.error("Error fetching followers:", followersError.message);
  }

  const followers = followersData as FollowerData[] | null;
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center p-6 max-w-md w-full mx-auto bg-red-100 rounded-xl shadow-md space-y-6 m-16">
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
        <div className="w-full bg-white p-4 rounded-lg shadow-inner space-y-4">
          <div>
            <p className="text-sm text-gray-500">Kasutajanimi:</p>
            <p className="text-lg font-medium">{username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">E-mail:</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          {/* <div>
          <p className="text-sm text-gray-500">Kasutaja alates:</p>
          <p className="text-lg font-medium">{formattedDate}</p>
        </div> */}

          {/* muuda parooli nupp */}
          <ChangePasswordButton email={user.email as string} />
        </div>
        <div className="w-full">
          <FollowersList followers={followers} />
        </div>
      </div>
    </div>
  );
}

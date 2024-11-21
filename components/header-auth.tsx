import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Logi sisse</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Liitu</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <>
      <div className="flex items-center gap-2">
        <Button size="sm" variant={"default"}>
          <Link href="/protected/recipe-form">Lisa retsept</Link>
        </Button>
        <Button size="sm" variant={"default"}>
          <Link href="/protected/user-recipes">Minu retseptid</Link>
        </Button>
        <Button size="sm" variant={"default"}>
          <Link href="/protected/user-account">Konto</Link>
        </Button>
        <Button size="sm" variant={"default"}>
          <Link href="/protected/search">Otsi kasutajaid</Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <form action={signOutAction}>
          <Button type="submit" size="sm" variant={"outline"}>
            Logi välja
          </Button>
        </form>
      </div>
    </>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-in">Logi sisse</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Liitu</Link>
      </Button>
    </div>
  );
}

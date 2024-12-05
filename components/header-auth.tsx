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
          <div className="flex gap-2 bg-red-100">
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
        <Link href="/protected/recipe-form">
          <Button size="sm" variant={"default"}>
            Lisa retsept
          </Button>
        </Link>
        <Link href="/protected/user-recipes">
          <Button size="sm" variant={"default"}>
            Minu retseptid
          </Button>
        </Link>
        <Link href="/protected/user-account">
          <Button size="sm" variant={"default"}>
            Konto
          </Button>
        </Link>
        <Link href="/protected/search">
          <Button size="sm" variant={"default"}>
            Otsi kasutajaid
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <form action={signOutAction}>
          <Button
            type="submit"
            size="sm"
            variant={"etc"}
            className="border-0 border-black"
          >
            Logi välja
          </Button>
        </form>
      </div>
    </>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"etc"}>
        <Link href="/sign-in">Logi sisse</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Liitu</Link>
      </Button>
    </div>
  );
}

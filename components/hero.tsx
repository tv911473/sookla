import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex-1 w-full flex flex-col gap-2 items-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Teretulemast Sööklasse!</h1>
      <h2>Liitu täna, et leida taskukohaseid retsepte oma toidulauale</h2>
      <div className="flex-1 w-full flex flex-col gap-2 items-center">
        <Button
          size="default"
          variant={"destructive"}
          style={{ animation: "pulse-scale 1.5s infinite ease-in-out" }}
        >
          <Link href="/sign-up">!!! Liitumiseks klikka siia !!!</Link>
        </Button>
      </div>
    </div>
  );
}

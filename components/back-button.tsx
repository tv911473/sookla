// SEDA SAAB LISADA IGALE POOLE, TEGINGI SELLE MOTTEGA ERALDI FAILI MEILE

"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-blue-500 hover:underline"
    >
      &larr; Tagasi
    </button>
  );
};

export default BackButton;

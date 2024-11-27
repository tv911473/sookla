import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const logo =
  "https://emetryzjnikmcwiqgjtv.supabase.co/storage/v1/object/public/recipe-images/recipe-images/sookla6.png?t=2024-11-21T12%3A47%3A11.168Z";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center bg-pink-50">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-red-100">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <div>
                      <Link href={"/"}>
                        <img src={logo} className="h-16"></img>
                      </Link>
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 w-[64rem]">{children}</div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                  Powered by{" "}
                  <a
                    href="https://www.tlu.ee/dt"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    TLU/DTI
                  </a>
                </p>
                <Link href="/about-us" className="text-base hover:underline">
                  Meist
                </Link>
                {/* <ThemeSwitcher /> */}
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

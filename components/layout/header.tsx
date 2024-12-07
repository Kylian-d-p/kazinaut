import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "../theme/toggle";

export default async function Header() {
  const session = await auth();

  return (
    <>
      <header className="h-20 p-5 flex items-center justify-between border-b border-b-accent-foreground fixed top-0 left-0 right-0 bg-background z-50">
        <Link href="/">
          <span className="text-xl font-bold">Kazinaut</span>
        </Link>
        <div className="flex items-center gap-2">
          {session && session.user ? (
            <Link href="/account">
              <Button>{session.user.name || "Mon Compte"}</Button>
            </Link>
          ) : (
            <Link href="/auth/signin">
              <Button>Se connecter</Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </header>
      <div className="h-20" />
    </>
  );
}

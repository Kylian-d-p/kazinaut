import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "../theme/toggle";

export default function Header() {
  return (
    <header className="h-20">
      <span>Kazinaut</span>
      <Link href="/auth/login">
        <Button>Se connecter</Button>
      </Link>
      <ThemeToggle/>
    </header>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <span>Kazinaut</span>
      <Link href="/login">
        <Button>Se connecter</Button>
      </Link>
    </div>
  );
}

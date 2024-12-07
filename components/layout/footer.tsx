import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-20 flex flex-wrap items-center gap-2 p-2 mt-5 border-t border-t-accent-foreground">
      <Link href="/privacy-policy">Politique de confidentialité</Link>
      <Link href="/terms-of-use">Conditions d&apos;utilisation</Link>
    </footer>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex justify-center pt-5">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Erreur 404</h1>
          </CardTitle>
          <CardDescription>La page que vous cherchez n'existe pas</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p>Vous pouvez retourner à la page d'accueil en cliquant sur le lien ci-dessous.</p>
          <Link href="/" className="self-center">
            <Button variant={"secondary"}>Retour à l'accueil</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}

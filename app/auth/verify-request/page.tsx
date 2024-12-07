import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyRequest() {
  return (
    <main className="flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Vérifiez votre adresse mail</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Un lien vous a été envoyé.</p>
        </CardContent>
      </Card>
    </main>
  );
}

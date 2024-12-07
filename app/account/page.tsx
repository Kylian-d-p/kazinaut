import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import AccountForm from "./form";

export default async function Account() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  return (
    <main className="flex justify-center pt-5">
      <div className="flex flex-col gap-5 w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl">Mon compte</h1>
            </CardTitle>
            <CardDescription>Modifiez les informations de votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm defaultValues={{ email: session.user.email, name: session.user.name }} />
          </CardContent>
        </Card>
        <form
          action={async () => {
            "use server";
            await signOut();
            redirect("/");
          }}
        >
          <Button variant="secondary" className="w-full">
            Se déconnecter
          </Button>
        </form>
      </div>
    </main>
  );
}

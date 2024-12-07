import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import SigninForm from "./form";

export default async function Signin() {
  const session = await auth();

  if (session && session.user) {
    redirect("/games");
  }

  return (
    <main className="flex justify-center pt-5">
      <div className="flex flex-col gap-5 w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl">Se connecter</h1>
            </CardTitle>
            <CardDescription>Connectez-vous à votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <SigninForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

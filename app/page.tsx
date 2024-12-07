import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-10 items-center justify-center h-[calc(100vh-5rem)]">
        <h1 className="text-6xl">Kazinaut</h1>
        <Link href="/games">
          <Button variant={"accent"} className="rounded-full">
            Rien ne va plus !
          </Button>
        </Link>
      </div>
    </main>
  );
}

import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Games() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const games = [
    {
      name: "Roulette",
      href: "/games/roulette",
      thumb: "/games-thumb/roulette.jpg",
    },
  ];

  return (
    <main className="flex justify-center pt-5">
      <div className="flex flex-col gap-5 w-full max-w-xl">
        <h1 className="text-3xl font-semibold">Jeux disponibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {games.map((game, i) => (
            <Link href={game.href} key={i} className="flex flex-col bg-secondary rounded-lg group">
              <div className="w-[192px] h-[108px] overflow-hidden rounded-lg">
                <Image src={game.thumb} alt={game.name} width={192} height={108} className="group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="p-3">{game.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

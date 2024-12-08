import RouletteGame from "./game";

export default async function Roulette() {
  return (
    <main className="flex justify-center pt-5">
      <div className="flex flex-col gap-5 w-full max-w-3xl">
        <h1 className="text-3xl font-semibold">Roulette</h1>
        <RouletteGame />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-10 items-center justify-center h-[calc(100vh-5rem)]">
        <h1 className="text-6xl">Kazinaut</h1>
        <p className="bg-accent text-accent-foreground px-3 py-2 rounded-full cursor-default hover:brightness-110 transition-[filter]">Rien ne va plus !</p>
      </div>
    </main>
  );
}

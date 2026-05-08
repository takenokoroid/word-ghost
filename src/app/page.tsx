import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">ワードゴースト</h1>
        <p className="text-lg text-zinc-500 max-w-xs">
          ゴーストが持っている対抗語を、議論で当てよう
        </p>
        <Link
          href="/game"
          className="rounded-full bg-foreground text-background px-10 py-3.5 text-lg font-bold transition-colors hover:opacity-90"
        >
          ゲームを始める
        </Link>
      </main>
    </div>
  );
}

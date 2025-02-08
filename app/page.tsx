"use client";
import Form from "./components/Form";



export default function Home() {
  return (
    <main className="container h-4/5 rounded-2xl bg-zinc-400 p-14 shadow-2xl lg:max-w-xl dark:bg-zinc-800">
      <div className="flex h-full flex-col items-stretch justify-center gap-4">
        <Form />
      </div>
    </main>
  );
}

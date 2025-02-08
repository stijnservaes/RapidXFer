"use client";
import { atom } from "jotai";
import Form from "./components/Form";

// Step 0 = default, 1 = file is being dragged, 2 = file is dropped
export const stepAtom = atom(0);
export const fileAtom = atom<File | null>(null);
export const senderMailAtom = atom("");
export const receiverMailAtom = atom("");
export const FILE_SIZE_ATOM = atom(52428800);

export default function Home() {
  return (
    <main className="container h-4/5 rounded-2xl bg-zinc-400 p-14 shadow-2xl lg:max-w-xl dark:bg-zinc-800">
      <div className="flex h-full flex-col items-stretch justify-center gap-4">
        <Form />
      </div>
    </main>
  );
}

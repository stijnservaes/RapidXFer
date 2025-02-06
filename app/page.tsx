"use client";
import { useState } from "react";
import Filedrag from "./components/Filedrag";

export default function Home() {
  // Step 0 = default, 1 = file is being dragged, 2 = file is dropped
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  
  return (
    <main
      className="container h-4/5 rounded-2xl bg-zinc-200 p-14 shadow-2xl lg:max-w-3xl dark:bg-zinc-800"
    >
      <div className="flex h-full flex-col items-stretch justify-center gap-4">
        <h1 className="text-center text-2xl font-bold">Transfer Files</h1>
        <Filedrag step={step} setStep={setStep} file={file} setFile={setFile} />
        <button>Send</button>
      </div>
    </main>
  );
}

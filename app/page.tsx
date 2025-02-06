"use client";
import { useState } from "react";
import Filedrag from "./components/Filedrag";

export default function Home() {
  // Step 0 = default, 1 = file is being dragged, 2 = file is dropped
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [senderMail, setSenderMail] = useState("");
  const [receiverMail, setReceiverMail] = useState("");

  return (
    <main className="container h-4/5 rounded-2xl bg-zinc-400 p-14 shadow-2xl lg:max-w-xl dark:bg-zinc-800">
      <div className="flex h-full flex-col items-stretch justify-center gap-4">
        <h1 className="text-center text-2xl font-bold">Transfer Files</h1>
        <input
          type="email"
          name="sender"
          id="sender"
          value={senderMail}
          placeholder="sender@mail.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSenderMail(e.currentTarget.value)
          }
          className="text-black dark:text-white placeholder-gray-600 dark:placeholder-white dark:bg-gray-600 py-1 px-4 rounded-full focus:outline focus:outline-2 dark:outline-white" 
        />
        <input
          type="email"
          name="receiver"
          id="receiver"
          value={receiverMail}
          placeholder="receiver@mail.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setReceiverMail(e.currentTarget.value)
          }
          className="text-black dark:text-white placeholder-gray-600 dark:placeholder-white dark:bg-gray-600 py-1 px-4 rounded-full focus:outline focus:outline-2 dark:outline-white" 
        />
        <Filedrag step={step} setStep={setStep} file={file} setFile={setFile} />
        <button>Send</button>
      </div>
    </main>
  );
}

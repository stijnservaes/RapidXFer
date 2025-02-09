"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { confirmTransfer, sendLink } from "./actions";
import { FadeLoader } from "react-spinners";
import { useAtomValue } from "jotai";
import { fileAtom } from "@/lib/store";

export default function Page() {
  const params = useParams();
  const file = useAtomValue(fileAtom);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const codeRef = useRef<HTMLInputElement>(null);

  async function handleConfirm() {
    if (!code) {
      setError("Please enter code");
      codeRef.current?.focus();
      return;
    }

    try {
      setIsSending(true);
      const result = await confirmTransfer({
        id: params.id as string,
        confirmationCode: code,
      });

      if (!result.success) {
        setError(result.message as string);
        setIsSending(false);
        return;
      }

      const uploadResponse = await fetch(result.data!.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": result.data!.fileType,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        setError("Upload failed, try again");
        setIsSending(false);
        return;
      }

      const sendMailResponse = await sendLink(result.data!.id);
      if (!sendMailResponse.success) {
        setError(sendMailResponse.message);
        setIsSending(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error has occurred.");
      }
    }
  }

  return (
    <main className="container h-4/5 rounded-2xl bg-zinc-600 p-14 shadow-2xl lg:max-w-xl dark:bg-zinc-800">
      <div className="flex h-full flex-col items-stretch justify-center gap-4">
        <h1 className="text-center text-xl font-bold text-white">{isSending ? <>Sending File...</> : <>Confirm</>}</h1>
        {isSending ? (
          <div className="flex items-center justify-center">
            <FadeLoader color="white" />
          </div>
        ) : (
          <>
            {error && (
              <p className="rounded-xl bg-red-700 p-2 font-bold text-white">
                {error}
              </p>
            )}

            <p className="text-center text-lg">
              Check your mail for a confirmation code.
            </p>

            <input
              type="text"
              name="code"
              id="code"
              ref={codeRef}
              value={code ?? ""}
              placeholder="Enter code here..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode(e.currentTarget.value)
              }
              className="rounded-full px-4 py-1 text-black placeholder-gray-600 focus:outline focus:outline-2 dark:bg-gray-600 dark:text-white dark:placeholder-white dark:outline-white"
            />

            <button
              onClick={handleConfirm}
              className="w-1/4 self-center rounded-full bg-slate-800 px-4 py-2 font-bold text-white hover:bg-zinc-400 hover:text-slate-800 hover:outline hover:outline-slate-800 dark:bg-slate-500 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-zinc-400 dark:hover:outline-zinc-400"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </main>
  );
}

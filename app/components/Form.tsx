import { useAtom, useAtomValue } from "jotai";
import { fileAtom, receiverMailAtom, senderMailAtom } from "@/lib/store";
import Filedrag from "./Filedrag";
import { useRef } from "react";

interface FormProps {
  handleSubmit: (
    senderMail: string,
    receiverMail: string,
    file: File | null
  ) => void;
  error: string;
}

export default function Form({ handleSubmit, error }: FormProps) {
  const [senderMail, setSenderMail] = useAtom(senderMailAtom);
  const [receiverMail, setReceiverMail] = useAtom(receiverMailAtom);
  const file = useAtomValue(fileAtom);

  const senderRef = useRef<HTMLInputElement>(null);
  const receiverRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {error && (
        <p className="rounded-xl bg-red-700 p-2 font-bold text-white">{error}</p>
      )}

      <input
        type="email"
        name="sender"
        id="sender"
        ref={senderRef}
        value={senderMail}
        placeholder="sender@mail.com"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSenderMail(e.currentTarget.value)
        }
        className="rounded-full px-4 py-1 text-black placeholder-gray-600 focus:outline focus:outline-2 dark:bg-gray-600 dark:text-white dark:placeholder-white dark:outline-white"
      />
      <input
        type="email"
        name="receiver"
        id="receiver"
        ref={receiverRef}
        value={receiverMail}
        placeholder="receiver@mail.com"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setReceiverMail(e.currentTarget.value)
        }
        className="rounded-full px-4 py-1 text-black placeholder-gray-600 focus:outline focus:outline-2 dark:bg-gray-600 dark:text-white dark:placeholder-white dark:outline-white"
      />
      <Filedrag />
      <button
        onClick={() => handleSubmit(senderMail, receiverMail, file)}
        className="w-1/4 self-center rounded-full bg-slate-800 px-4 py-2 font-bold text-white hover:bg-zinc-400 hover:text-slate-800 hover:outline hover:outline-slate-800 dark:bg-slate-500 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-zinc-400 dark:hover:outline-zinc-400"
      >
        Send
      </button>
    </>
  );
}

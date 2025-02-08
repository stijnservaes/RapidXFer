import { useAtom, useAtomValue } from "jotai";
import {
  FILE_SIZE_ATOM,
  fileAtom,
  receiverMailAtom,
  senderMailAtom,
} from "../page";
import Filedrag from "./Filedrag";
import { useRef, useState } from "react";
import { uploadMetadata } from "../actions";

export default function Form() {
  const FILE_SIZE = useAtomValue(FILE_SIZE_ATOM);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [senderMail, setSenderMail] = useAtom(senderMailAtom);
  const [receiverMail, setReceiverMail] = useAtom(receiverMailAtom);
  const [file, setFile] = useAtom(fileAtom);
  const [error, setError] = useState("");

  const senderRef = useRef<HTMLInputElement>(null);
  const receiverRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!senderMail || !emailRegex.test(senderMail)) {
      setError("Please enter mail from sender.");
      senderRef.current?.focus();
      return;
    }

    if (!receiverMail || !emailRegex.test(receiverMail)) {
      setError("Please enter mail for receiver.");
      receiverRef.current?.focus();
      return;
    }

    if (!file) {
      setError("Choose a file.");
      return;
    }

    if (file.size > FILE_SIZE) {
      setError("File size exceeds 50MB limit.");
      setFile(null);
      return;
    }

    const formData = new FormData();
    formData.set("receiverMail", receiverMail);
    formData.set("senderMail", senderMail);
    formData.set("fileName", file.name);
    formData.set("fileType", file.type);

    try {
      const result = await uploadMetadata(formData);
      if (!result.success) {
        setError(result.message);
        return
      }
      const uploadResult = await fetch (result.message, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file
      })

      if (!uploadResult.ok) {
        setError(uploadResult.statusText)
        return
      }

      setError("Succesfully uploaded file")
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error has occurred");
      }
    }
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold">Transfer Files</h1>

      {error && (
        <p className="rounded-xl bg-red-700 p-2 font-bold text-white">
          {error}
        </p>
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
        onClick={handleSubmit}
        className="w-1/4 self-center rounded-full bg-slate-800 px-4 py-2 font-bold text-white hover:bg-zinc-400 hover:text-slate-800 hover:outline hover:outline-slate-800 dark:bg-slate-500 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-zinc-400 dark:hover:outline-zinc-400"
      >
        Send
      </button>
    </>
  );
}

"use client";
import { useAtomValue } from "jotai";
import { FILE_SIZE_ATOM } from "@/lib/store";
import Form from "./components/Form";
import { useState } from "react";
import { uploadMetadata } from "./actions";

export default function Home() {
  const FILE_SIZE = useAtomValue(FILE_SIZE_ATOM);
  const [error, setError] = useState("");

  async function handleSubmit(
    senderMail: string,
    receiverMail: string,
    file: File | null
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!senderMail || !emailRegex.test(senderMail)) {
      setError("Please enter mail from sender.");
      return;
    }

    if (!receiverMail || !emailRegex.test(receiverMail)) {
      setError("Please enter mail for receiver.");
      return;
    }

    if (!file) {
      setError("Choose a file.");
      return;
    }

    if (file.size > FILE_SIZE) {
      setError("File size exceeds 50MB limit.");
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
        return;
      }

      const uploadResult = await fetch(result.message, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResult.ok) {
        setError(uploadResult.statusText);
        return;
      }

      setError("Successfully uploaded file.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error has occurred.");
      }
    }
  }

  return (
    <main className="container h-4/5 rounded-2xl bg-zinc-400 p-14 shadow-2xl lg:max-w-xl dark:bg-zinc-800">
      <div className="flex h-full flex-col items-stretch justify-center gap-4">
        <Form handleSubmit={handleSubmit} error={error} />
      </div>
    </main>
  );
}

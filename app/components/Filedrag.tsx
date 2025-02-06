"use client";
import { useState } from "react";

export default function Filedrag({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setStep(1)
  }

  function handleDragLeave() {
    setStep(0)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setStep(0)

    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0])
      setStep(2)
    }
  }

  function handleRemoveFile() {
    setStep(0)
    setFile(null)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`${step !== 0 ? "outline bg-zinc-300 dark:bg-zinc-900" :"outline-dashed outline-2" }  flex h-28 items-center justify-center rounded-xl `}
    >
      {step === 0 ? (
        <b>Drag a file here...</b>
      ) : step === 1 ? (
        <b>Drop</b>
      ) : step === 2 ? (
        <div className="flex justify-center items-center gap-2">
          <button onClick={handleRemoveFile} className="font-bold text-gray-600 dark:text-gray-400">X</button>
          <b>{file?.name}</b>
        </div>
      ) : (
        <b>Error</b>
      )}
    </div>
  );
}

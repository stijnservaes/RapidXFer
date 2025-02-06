"use client";

import { useRef } from "react";
import { useAtom } from "jotai";
import { fileAtom, stepAtom } from "../page";

export default function Filedrag({}) {
  const [step, setStep] = useAtom(stepAtom)
  const [file, setFile] = useAtom(fileAtom)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setStep(1);
  }

  function handleDragLeave() {
    setStep(0);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setStep(0);

    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
      setStep(2);
    }
  }

  function handleRemoveFile() {
    setStep(0);
    setFile(null);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setStep(2);
    }
  }

  function handleClick() {
    if (step === 0) {
      fileInputRef.current?.click();
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`${step !== 0 ? "bg-zinc-400 outline dark:bg-zinc-900" : "cursor-pointer outline-dashed outline-2 hover:bg-zinc-600 hover:outline hover:dark:bg-zinc-900"} flex h-28 items-center justify-center overflow-hidden rounded-xl`}
    >
      {step === 0 ? (
        <b>Click here or drag a file here...</b>
      ) : step === 1 ? (
        <b>Drop</b>
      ) : step === 2 ? (
        <div className="flex flex-wrap-reverse items-center justify-center gap-2">
          <button
            onClick={handleRemoveFile}
            className="font-bold text-gray-600 dark:text-gray-400"
          >
            X
          </button>
          <b>{file?.name}</b>
        </div>
      ) : (
        <b>Error</b>
      )}

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
    </div>
  );
}

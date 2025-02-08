import { atom } from "jotai";

// Step 0 = default, 1 = file is being dragged, 2 = file is dropped
export const stepAtom = atom(0);
export const fileAtom = atom<File | null>(null);
export const senderMailAtom = atom("");
export const receiverMailAtom = atom("");
export const FILE_SIZE_ATOM = atom(52428800);
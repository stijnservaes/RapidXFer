import { useAtom } from "jotai";
import { receiverMailAtom, senderMailAtom } from "../page";
import Filedrag from "./Filedrag";

export default function Form() {
  const [senderMail, setSenderMail] = useAtom(senderMailAtom);
  const [receiverMail, setReceiverMail] = useAtom(receiverMailAtom);
  return (
    <>
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
        className="rounded-full px-4 py-1 text-black placeholder-gray-600 focus:outline focus:outline-2 dark:bg-gray-600 dark:text-white dark:placeholder-white dark:outline-white"
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
        className="rounded-full px-4 py-1 text-black placeholder-gray-600 focus:outline focus:outline-2 dark:bg-gray-600 dark:text-white dark:placeholder-white dark:outline-white"
      />
      <Filedrag />
      <button className="w-1/4 self-center rounded-full bg-slate-800 px-4 py-2 font-bold text-white hover:bg-zinc-400 hover:text-slate-800 hover:outline hover:outline-slate-800 dark:bg-slate-500 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-zinc-400 dark:hover:outline-zinc-400">
        Send
      </button>
    </>
  );
}

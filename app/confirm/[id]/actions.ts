"use server";
import { confirmCode, retrieveMetadata, verifyStatus } from "@/lib/database";
import { sendDownloadLink } from "@/lib/email";
import { EXPIRATION_TIME } from "@/lib/store";
import { supabase } from "@/lib/supabaseSetup";
import { redirect } from "next/navigation";
import { z } from "zod";

const confirmTransferSchema = z.object({
  id: z
    .string()
    .min(1, "Error with filetransfer. Please go back to filetransfer."),
  confirmationCode: z.string().length(6, "Code is not 6 characters long"),
});

export async function confirmTransfer({
  id,
  confirmationCode,
}: {
  id: string;
  confirmationCode: string;
}) {
  const parsedData = confirmTransferSchema.safeParse({ id, confirmationCode });
  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map((e) => e.message).join(" "),
    };
  }

  try {
    const confirmed = await confirmCode(
      parsedData.data.id,
      parsedData.data.confirmationCode,
    );

    if (!confirmed) {
      return {
        success: false,
        message: "Verification code incorrect.",
      };
    }

    const result = await verifyStatus(parsedData.data.id);

    return {
      success: true,
      message: "Success",
      data: {
        signedUrl: result.signedUrl!,
        receiverMail: result.receiverMail,
        senderMail: result.senderMail,
        fileType: result.fileType,
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        success: false,
        message: "Database Error occurred.",
      };
    } else {
      console.error("An unknown error has occurred");
      return {
        success: false,
        message: "An unknown error has occurred.",
      };
    }
  }
}

export async function sendLink(id: string) {
  try {
    const metadata = await retrieveMetadata(id);

    if (!metadata) {
      return {
        success: false,
        message: "ID is not valid",
      };
    }

    const { data, error } = await supabase.storage
      .from("uploadedfiles")
      .createSignedUrl(metadata.fileName, EXPIRATION_TIME);


    if (error) {
      return {
        success: false,
        message: error.message
      }
    }

    await sendDownloadLink(metadata.receiverMail, metadata.senderMail, data.signedUrl)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        success: false,
        message: "Database Error occurred.",
      };
    } else {
      console.error("An unknown error has occurred");
      return {
        success: false,
        message: "An unknown error has occurred.",
      };
    }
  }

  redirect("/success")
}

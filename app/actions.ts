"use server";

import { supabase } from "@/lib/supabaseSetup";
import { z } from "zod";
import { randomUUID } from "crypto";
import { createMetadata } from "@/lib/database";
import { generateCode } from "@/lib/crypto";
import { sendConfirmation } from "@/lib/email";

const uploadMetadataSchema = z.object({
  senderMail: z.string().email("Invalid email adress."),
  receiverMail: z.string().email("Invalid email address."),
  fileName: z.string().min(1, "File name is required."),
  fileType: z.string().min(1, "File type is reaquired"),
});

export async function uploadMetadata(formData: FormData) {
  const data = {
    senderMail: formData.get("senderMail"),
    receiverMail: formData.get("receiverMail"),
    fileName: formData.get("fileName"),
    fileType: formData.get("fileType"),
  };

  const parsedData = uploadMetadataSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map(e => e.message).join(" "),
    };
  }

  try {
    const fileName = `${randomUUID()}-${parsedData.data.fileName}`;
    const { data: signedData, error: signedError } = await supabase.storage
      .from("uploadedfiles")
      .createSignedUploadUrl(fileName);
    if (signedError) {
      return {
        success: false,
        message: signedError.message,
      };
    }

    const randomCode = generateCode();

    const resultingId = await createMetadata(
      parsedData.data.senderMail,
      parsedData.data.receiverMail,
      fileName,
      parsedData.data.fileType,
      signedData.signedUrl,
      randomCode,
    );

    await sendConfirmation(parsedData.data.senderMail, randomCode);

    return {
      success: true,
      message: resultingId,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return {
        success: false,
        message: "Database Error occurred.",
      };
    } else {
      console.error("An unknown error occurred.");
      return {
        success: false,
        message: "An unknown error occurred.",
      };
    }
  }
}

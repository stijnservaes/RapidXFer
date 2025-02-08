"use server"

import { supabase } from "@/lib/supabase"
import { randomUUID } from "crypto"
import { z } from "zod"

const uploadMetadataSchema = z.object({
  senderMail: z.string().email("Invalid email adress."),
  receiverMail: z.string().email("Invalid email address."),
  fileName: z.string().min(1, "File name is required."),
  fileType: z.string().min(1, "File type is reaquired")
})

export async function uploadMetadata(formData: FormData) {
  const data = {
    senderMail: formData.get("senderMail"),
    receiverMail: formData.get("receiverMail"),
    fileName: formData.get("fileName"),
    fileType: formData.get("fileType")
  }

  const parsedData = uploadMetadataSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false, 
      message: parsedData.error.errors.join(" ")
    }
  }
  
  const {data: signedData, error: signedError} = await supabase.storage.from("uploadedfiles").createSignedUploadUrl(parsedData.data.fileName)
  if (signedError) {
    return {
      success: false,
      message: signedError.message
    }
  }

  return {
    success: true,
    message: signedData.signedUrl
  }

  return {
    success: true,
    message: ""
  }
}
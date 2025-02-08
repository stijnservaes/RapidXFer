"use server"

import { supabase } from "@/lib/supabase"
import { randomUUID } from "crypto"

export async function uploadMetadata(formData: FormData) {

  return {
    success: true,
    message: ""
  }
}
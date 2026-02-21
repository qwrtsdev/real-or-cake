import { supabase } from "@/lib/supabase"

function buildFileName(originalName: string): string {
  const now = new Date()
  const MM = String(now.getMonth() + 1).padStart(2, "0")
  const DD = String(now.getDate()).padStart(2, "0")
  const YY = String(now.getFullYear()).slice(-2)
  const hh = String(now.getHours()).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")
  const ss = String(now.getSeconds()).padStart(2, "0")

  const ext = originalName.split(".").pop()?.toLowerCase() ?? "jpg"
  return `temp-${MM}${DD}${YY}_${hh}${mm}${ss}.${ext}`
}

export async function uploadImageToSupabase(file: File): Promise<string> {
  const fileName = buildFileName(file.name)

  // Step 1: wait for upload to fully complete
  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file, { upsert: false })

  if (error) throw new Error(`Upload failed: ${error.message}`)

  // Step 2: only after upload is done, get the public URL by the same fileName
  const { data } = supabase.storage.from("images").getPublicUrl(fileName)

  // Step 3: return the URL — caller (page.tsx) will then pass this into sendImageUrl()
  return data.publicUrl
}



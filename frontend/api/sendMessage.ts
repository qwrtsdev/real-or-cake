export interface ApiResponse {
  result: boolean
  accuracy: number
  reason: string
  lang: string
}

export async function sendPrompt(prompt: string): Promise<ApiResponse> {
  // const body = new URLSearchParams({ prompt, lang: "th" })

  const res = await fetch("http://10.98.245.61:8000/prompt", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `"prompt=${prompt}&lang=th"`,
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json() as Promise<ApiResponse>
}

export async function sendImageUrl(url: string): Promise<ApiResponse> {
  // const body = new URLSearchParams({ url, lang: "th" })

  const res = await fetch("http://10.98.245.61:8000/url", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `"url=${url}&lang=th"`,
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json() as Promise<ApiResponse>
}

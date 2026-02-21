export interface ApiResponse {
  result: boolean
  accuracy: number
  reason: string
  lang: string
}

export async function sendPrompt(prompt: string): Promise<ApiResponse> {
  const body = new URLSearchParams({ prompt, lang: "th" })

  const res = await fetch("http://localhost:8000/prompt", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json() as Promise<ApiResponse>
}

export async function sendImageUrl(url: string): Promise<ApiResponse> {
  const body = new URLSearchParams({ url, lang: "th" })
  console.log("Sending image URL to API:", url)
  console.log("Request body:", body.toString())
  const res = await fetch("http://localhost:8000/url", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json() as Promise<ApiResponse>
}

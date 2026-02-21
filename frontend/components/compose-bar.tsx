"use client"

import { useState, useCallback } from "react"
import { SendHorizontal, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { MediaDropZone } from "@/components/media-drop-zone"

type Mode = "text" | "media"

interface ComposeBarProps {
  onSend: (message: string, file?: File) => void
  isLoading: boolean
}

export function ComposeBar({ onSend, isLoading }: ComposeBarProps) {
  const [mode, setMode] = useState<Mode>("text")
  const [text, setText] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const canSend =
    !isLoading && (text.trim().length > 0 || selectedFile !== null)

  const handleSend = useCallback(() => {
    if (!canSend) return
    onSend(text.trim(), selectedFile ?? undefined)
    setText("")
    setSelectedFile(null)
    setMode("text")
  }, [canSend, text, selectedFile, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  return (
    <div className="w-full px-4 pb-4 pt-2 md:px-0">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-border bg-card">
          

          {/* Contents / Message show here */}
          <div className="px-2 pt-2">
            {mode === "text" ? (
              <div className="flex items-end gap-2 px-1 pb-3 pt-1">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="กรอกข้อความ..."
                  rows={1}
                  className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  disabled={!canSend}
                  onClick={handleSend}
                  className={cn(
                    "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all",
                    canSend
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                  aria-label={isLoading ? "Sending message" : "Send message"}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-4 w-4" />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-1 pb-3 pt-1">
                <div className="flex-1">
                  <MediaDropZone
                    onFileSelect={setSelectedFile}
                    selectedFile={selectedFile}
                  />
                </div>
                <button
                  type="button"
                  disabled={!canSend}
                  onClick={handleSend}
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all",
                    canSend
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                  aria-label={isLoading ? "Sending message" : "Send message"}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-4 w-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 border-b border-border px-3 pt-3 pb-2">
            <button
              type="button"
              onClick={() => setMode("text")}
              className={cn(
                "flex-1 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors text-center",
                mode === "text"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              โหมดข้อความ
            </button>
            <button
              type="button"
              onClick={() => setMode("media")}
              className={cn(
                "flex-1 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors text-center",
                mode === "media"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              โหมดมีเดีย
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

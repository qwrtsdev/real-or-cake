"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { MessageBubble } from "@/components/message-bubble"
import { ResultBubble } from "@/components/result-bubble"
import { SkeletonBubble } from "@/components/skeleton-bubble"
import { ComposeBar } from "@/components/compose-bar"
import { EmptyState } from "@/components/empty-state"
import { HeaderCard } from "@/components/header-card"
import { sendPrompt, sendImageUrl, type ApiResponse } from "@/api/sendMessage"

interface UserMessage {
  id: string
  kind: "user"
  content: string
  timestamp: string
}

interface BotMessage {
  id: string
  kind: "bot"
  response: ApiResponse
  timestamp: string
}

interface PendingMessage {
  id: string
  kind: "pending"
}

type Message = UserMessage | BotMessage | PendingMessage

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function Page() {
  const showHeaderCard = false

  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = useCallback(async (text: string, file?: File) => {
    const userMessage: UserMessage = {
      id: crypto.randomUUID(),
      kind: "user",
      content: file ? `[Image: ${file.name}]${text ? ` ${text}` : ""}` : text,
      timestamp: formatTime(),
    }

    const pendingId = crypto.randomUUID()
    const pendingMessage: PendingMessage = { id: pendingId, kind: "pending" }

    setMessages((prev) => [...prev, userMessage, pendingMessage])
    setIsLoading(true)

    try {
      const trimmed = text.trim()
      const isUrl = /^https?:\/\//i.test(trimmed)
      const response = isUrl ? await sendImageUrl(trimmed) : await sendPrompt(text)
      const botMessage: BotMessage = {
        id: crypto.randomUUID(),
        kind: "bot",
        response,
        timestamp: formatTime(),
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === pendingId ? botMessage : m))
      )
    } catch {
      const errorResponse: ApiResponse = {
        result: false,
        accuracy: 0,
        reason: "เกิดข้อผิดพลาดในการเชื่อมต่อ API กรุณาลองใหม่อีกครั้ง",
        lang: "th",
      }
      const botMessage: BotMessage = {
        id: crypto.randomUUID(),
        kind: "bot",
        response: errorResponse,
        timestamp: formatTime(),
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === pendingId ? botMessage : m))
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col overflow-y-auto px-4 md:px-0"
      >
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
          {showHeaderCard && (
            <HeaderCard
              scrollRef={scrollRef}
              placeholder="Real or Cake? ส่งรูปหรือข้อความมาเลย!"
            />
          )}
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-3 pt-2 pb-4">
              {messages.map((msg) => {
                if (msg.kind === "user") {
                  return (
                    <MessageBubble
                      key={msg.id}
                      content={msg.content}
                      isUser={true}
                      timestamp={msg.timestamp}
                    />
                  )
                }
                if (msg.kind === "pending") {
                  return <SkeletonBubble key={msg.id} />
                }
                return (
                  <ResultBubble
                    key={msg.id}
                    response={msg.response}
                    timestamp={msg.timestamp}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Compose bar pinned to bottom */}
      <ComposeBar onSend={handleSend} isLoading={isLoading} />
    </div>
  )
}

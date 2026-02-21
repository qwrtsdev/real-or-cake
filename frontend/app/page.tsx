"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { MessageBubble } from "@/components/message-bubble"
import { ComposeBar } from "@/components/compose-bar"
import { EmptyState } from "@/components/empty-state"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: string
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = useCallback((text: string, file?: File) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: file ? `[Image: ${file.name}] ${text || ""}`.trim() : text,
      isUser: true,
      timestamp: formatTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate a reply after a short delay
    setTimeout(() => {
      const replyMessage: Message = {
        id: crypto.randomUUID(),
        content: file
          ? "Got your image, thanks for sharing!"
          : "Message received. How can I help you further?",
        isUser: false,
        timestamp: formatTime(),
      }
      setMessages((prev) => [...prev, replyMessage])
      setIsLoading(false)
    }, 1200)
  }, [])

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col overflow-y-auto px-4 md:px-0"
      >
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-3 pb-4">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  content={msg.content}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compose bar pinned to bottom */}
      <ComposeBar onSend={handleSend} isLoading={isLoading} />
    </div>
  )
}

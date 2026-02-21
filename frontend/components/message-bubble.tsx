import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  content: string
  isUser: boolean
  timestamp: string
}

export function MessageBubble({ content, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 md:max-w-[65%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        <span
          className={cn(
            "mt-1.5 block text-[11px]",
            isUser ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          {timestamp}
        </span>
      </div>
    </div>
  )
}

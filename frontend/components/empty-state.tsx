import { MessageSquare } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
        <MessageSquare className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h2 className="text-base font-medium text-foreground">
          No messages yet
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Start a conversation by typing below
        </p>
      </div>
    </div>
  )
}

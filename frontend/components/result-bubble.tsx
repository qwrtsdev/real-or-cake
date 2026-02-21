import { cn } from "@/lib/utils"
import type { ApiResponse } from "@/api/sendMessage"
import Image from "next/image"

interface ResultBubbleProps {
  response: ApiResponse
  imageUrl?: string
  timestamp: string
}

export function ResultBubble({ response, imageUrl, timestamp }: ResultBubbleProps) {
  const { result, accuracy, reason } = response
  const unsure = accuracy < 95

  const label = unsure ? "Unsure" : result ? "Real" : "Cake"
  const labelColor = unsure
    ? "text-orange-400"
    : result
    ? "text-green-400"
    : "text-red-400"

  const barColor = unsure
    ? "bg-orange-400"
    : result
    ? "bg-green-400"
    : "bg-red-400"

  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[80%] rounded-2xl bg-secondary px-4 py-3 md:max-w-[65%]">
        {/* Uploaded image preview */}
        {imageUrl && (
          <div className="mb-3 overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt="Uploaded image"
              width={400}
              height={300}
              className="w-full object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Big verdict */}
        <p className={cn("text-3xl font-bold tracking-tight", labelColor)}>
          {label}
        </p>

        {/* Accuracy bar */}
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Accuracy</span>
            <span className={cn("text-xs font-semibold", labelColor)}>
              {accuracy}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full transition-all duration-700", barColor)}
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        {/* Reason */}
        <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">
          {reason}
        </p>

        {/* Timestamp */}
        <span className="mt-1.5 block text-[11px] text-muted-foreground">
          {timestamp}
        </span>
      </div>
    </div>
  )
}

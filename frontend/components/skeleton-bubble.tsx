export function SkeletonBubble() {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[80%] rounded-2xl bg-secondary px-4 py-3 md:max-w-[65%]">
        {/* Verdict placeholder */}
        <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />

        {/* Bar placeholder */}
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            <div className="h-3 w-8 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-2 w-full animate-pulse rounded-full bg-muted" />
        </div>

        {/* Reason placeholder */}
        <div className="mt-3 space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
          <div className="h-3 w-3/5 animate-pulse rounded bg-muted" />
        </div>

        {/* Timestamp placeholder */}
        <div className="mt-2 h-2.5 w-10 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}

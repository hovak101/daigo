import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props} />
  );
}

function ResizablePanel({
  ...props
}) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  className,
  ...props
}) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative z-10 -mx-2 flex w-4 items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 after:transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:-my-2 data-[panel-group-direction=vertical]:mx-0 data-[panel-group-direction=vertical]:h-4 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        isHovered ? "after:bg-gray-800" : "after:bg-transparent",
        className
      )}
      {...props}
    />
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

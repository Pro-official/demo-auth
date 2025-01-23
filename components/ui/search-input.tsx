import * as React from "react";

import { cn } from "@/lib/utils";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      style={
        {
          // "--spread": "90deg",
          // "--shimmer-color": shimmerColor,
          "--radius": "100px",
          // "--speed": shimmerDuration,
          // "--cut": shimmerSize,
          // "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "flex h-10 w-full rounded-md  px-3 py-2 text-base  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
SearchInput.displayName = "SearchInput";

export { SearchInput };

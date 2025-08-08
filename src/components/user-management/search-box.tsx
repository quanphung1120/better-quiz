"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export type SearchBoxProps = {
  placeholder?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  showShortcut?: boolean;
  shortcut?: string;
};

export function SearchBox({
  placeholder,
  className,
  onClick,
  disabled = false,
}: SearchBoxProps) {
  return (
    <Input
      disabled={disabled}
      onClick={onClick}
      aria-label="Open search"
      placeholder={placeholder}
      className={cn(
        // layout
        "h-9 px-3 justify-start",
        // look and feel
        "rounded-md border border-input bg-background/60 hover:bg-background",
        "text-sm text-muted-foreground shadow-sm",
        // focus
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    />
  );
}

// components/ui/sheet.tsx
"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

// util mínima para clases (evitamos depender de "@/lib/utils")
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetPortal({ children }: { children: React.ReactNode }) {
  return <Dialog.Portal>{children}</Dialog.Portal>;
}

export function SheetOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

type Side = "top" | "bottom" | "left" | "right";

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  side?: Side;
}

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) {
  const sideClasses: Record<Side, string> = {
    left:
      "inset-y-0 left-0 h-full w-3/4 max-w-[22rem] border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
    right:
      "inset-y-0 right-0 h-full w-3/4 max-w-[22rem] border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
    top:
      "inset-x-0 top-0 w-full border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
    bottom:
      "inset-x-0 bottom-0 w-full border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
  };

  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        data-side={side}
        className={cn(
          "fixed z-50 bg-white p-6 shadow-lg outline-none transition ease-in-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:duration-300 data-[state=closed]:duration-200",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
        <Dialog.Close
          className={cn(
            "absolute right-4 top-4 inline-flex items-center justify-center rounded-md",
            "opacity-70 ring-offset-background transition-opacity hover:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </Dialog.Close>
      </Dialog.Content>
    </SheetPortal>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5", className)} {...props} />;
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

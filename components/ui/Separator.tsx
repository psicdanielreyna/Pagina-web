// components/ui/Separator.tsx
import React from "react";

export default function Separator({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto h-px max-w-6xl bg-emerald-900/10" />
    </div>
  );
}
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCalendarLink({ url }: { url: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return <div className="calendar-subscribe-copy">
    <button className="button button--outline" type="button" onClick={copy}>
      {status === "copied" ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
      {status === "copied" ? "Link copied" : "Copy subscription link"}
    </button>
    <span className="calendar-subscribe-copy-status" role="status">
      {status === "failed" ? "Couldn’t copy automatically. Use the link below instead." : ""}
    </span>
    {status === "failed" && <a href={url} target="_blank" rel="noopener noreferrer">Open subscription link</a>}
  </div>;
}

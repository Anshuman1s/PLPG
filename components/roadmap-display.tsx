"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

interface RoadmapDisplayProps {
  content: string;
  isStreaming: boolean;
  onReset: () => void;
}

function parseMarkdown(text: string): string {
  // Headers
  let html = text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Bullet points
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

  // Numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Paragraphs (lines that aren't already tagged)
  html = html
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (
        trimmed === "" ||
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<li") ||
        trimmed.startsWith("<hr")
      ) {
        return line;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

export function RoadmapDisplay({
  content,
  isStreaming,
  onReset,
}: RoadmapDisplayProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isStreaming && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [content, isStreaming]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          <ArrowLeft className="size-4 mr-2" />
          New Roadmap
        </Button>
        <Button
          variant="outline"
          onClick={handleCopy}
          className="border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          {copied ? (
            <>
              <Check className="size-4 mr-2 text-primary" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Roadmap Content */}
      <div className="rounded-xl border border-border bg-card p-6 md:p-8">
        <div
          className="roadmap-content"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
        {isStreaming && (
          <span className="inline-block w-2 h-5 bg-primary animate-pulse rounded-sm ml-1" />
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

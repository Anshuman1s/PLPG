"use client";

import { useState, useCallback } from "react";
import { Hero } from "@/components/hero";
import { AssessmentForm } from "@/components/assessment-form";
import { RoadmapDisplay } from "@/components/roadmap-display";

interface FormData {
  skill: string;
  goal: string;
  level: string;
  dailyTime: string;
  learningPreference: string;
  budget: string;
  deadline: string;
  challenges: string;
}

export default function Home() {
  const [roadmap, setRoadmap] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const handleGenerate = useCallback(async (data: FormData) => {
    setIsLoading(true);
    setIsStreaming(true);
    setRoadmap("");
    setShowRoadmap(true);

    try {
      console.log("[v0] Sending request with data:", data);
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("[v0] Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[v0] Error response body:", errorText);
        throw new Error(`Failed to generate roadmap: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setRoadmap(accumulated);
      }
      console.log("[v0] Streaming complete, total length:", accumulated.length);
    } catch (error) {
      console.error("[v0] Error generating roadmap:", error);
      setRoadmap(
        "An error occurred while generating your roadmap. Please try again."
      );
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, []);

  const handleReset = () => {
    setRoadmap("");
    setShowRoadmap(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Decorative grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,oklch(0.27_0.02_260/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.27_0.02_260/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.65_0.19_160/0.08),transparent_60%)] pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm font-heading">
                  LP
                </span>
              </div>
              <span className="font-bold text-lg text-foreground font-heading">
                LearnPath
              </span>
            </div>
            <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
              AI Strategy Generator
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          {!showRoadmap ? (
            <div className="flex flex-col gap-12">
              <Hero />
              <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                <AssessmentForm
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ) : (
            <RoadmapDisplay
              content={roadmap}
              isStreaming={isStreaming}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-12">
          <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">
            Powered by AI to help you learn smarter, not harder.
          </div>
        </footer>
      </div>
    </main>
  );
}

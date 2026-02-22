import { Sparkles, Zap, BarChart3, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <div className="text-center flex flex-col items-center gap-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
        <Sparkles className="size-3.5" />
        AI-Powered Learning
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-heading text-balance">
        Your Personalized
        <br />
        <span className="text-primary">Learning Roadmap</span>
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
        Tell us about your learning goals, and our AI will generate a detailed,
        week-by-week strategy tailored to your schedule, style, and budget.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-primary" />
          Week-by-week plan
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="size-4 text-primary" />
          Progress milestones
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-primary" />
          Curated resources
        </div>
      </div>
    </div>
  );
}

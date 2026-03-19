"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Target,
  Clock,
  Brain,
  Wallet,
  CalendarDays,
  AlertTriangle,
  Sparkles,
  Loader2,
} from "lucide-react";

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

interface AssessmentFormProps {
  onGenerate: (data: FormData) => void;
  isLoading: boolean;
}

export function AssessmentForm({ onGenerate, isLoading }: AssessmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    skill: "",
    goal: "",
    level: "",
    dailyTime: "",
    learningPreference: "",
    budget: "",
    deadline: "",
    challenges: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.skill &&
    formData.goal &&
    formData.level &&
    formData.dailyTime &&
    formData.learningPreference;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Skill / Subject */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="skill"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <BookOpen className="size-4 text-primary" />
          Skill / Subject
        </Label>
        <Input
          id="skill"
          placeholder="e.g., Python Programming, Machine Learning, Guitar..."
          value={formData.skill}
          onChange={(e) => updateField("skill", e.target.value)}
          className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary"
          required
        />
      </div>

      {/* Learning Goal */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="goal"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <Target className="size-4 text-primary" />
          Learning Goal
        </Label>
        <Textarea
          id="goal"
          placeholder="What do you want to achieve? Be specific about your end goal..."
          value={formData.goal}
          onChange={(e) => updateField("goal", e.target.value)}
          className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary min-h-20"
          required
        />
      </div>

      {/* Proficiency Level & Daily Time */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Brain className="size-4 text-primary" />
            Current Proficiency
          </Label>
          <Select
            value={formData.level}
            onValueChange={(value) => updateField("level", value)}
            required
          >
            <SelectTrigger className="w-full bg-secondary/50 border-border text-foreground">
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="complete-beginner">
                Complete Beginner
              </SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert (Looking to Master)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="size-4 text-primary" />
            Daily Study Time
          </Label>
          <Select
            value={formData.dailyTime}
            onValueChange={(value) => updateField("dailyTime", value)}
            required
          >
            <SelectTrigger className="w-full bg-secondary/50 border-border text-foreground">
              <SelectValue placeholder="Available time per day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15-30 minutes">15-30 minutes</SelectItem>
              <SelectItem value="30-60 minutes">30-60 minutes</SelectItem>
              <SelectItem value="1-2 hours">1-2 hours</SelectItem>
              <SelectItem value="2-4 hours">2-4 hours</SelectItem>
              <SelectItem value="4+ hours">{"4+ hours"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Learning Preference & Budget */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="size-4 text-primary" />
            Learning Preference
          </Label>
          <Select
            value={formData.learningPreference}
            onValueChange={(value) =>
              updateField("learningPreference", value)
            }
            required
          >
            <SelectTrigger className="w-full bg-secondary/50 border-border text-foreground">
              <SelectValue placeholder="How do you learn best?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visual">
                Visual (Videos, Diagrams)
              </SelectItem>
              <SelectItem value="reading">
                Reading (Articles, Books)
              </SelectItem>
              <SelectItem value="hands-on">
                Hands-on (Projects, Practice)
              </SelectItem>
              <SelectItem value="interactive">
                Interactive (Courses, Workshops)
              </SelectItem>
              <SelectItem value="mixed">Mixed / All of the above</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Wallet className="size-4 text-primary" />
            Budget Constraints
          </Label>
          <Select
            value={formData.budget}
            onValueChange={(value) => updateField("budget", value)}
          >
            <SelectTrigger className="w-full bg-secondary/50 border-border text-foreground">
              <SelectValue placeholder="Your learning budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free-only">Free Resources Only</SelectItem>
              <SelectItem value="under-50">{"Under $50"}</SelectItem>
              <SelectItem value="50-200">{"$50 - $200"}</SelectItem>
              <SelectItem value="200-500">{"$200 - $500"}</SelectItem>
              <SelectItem value="no-limit">No Budget Limit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Deadline */}
      <div className="flex flex-col gap-2">
        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <CalendarDays className="size-4 text-primary" />
          Timeline / Deadline
        </Label>
        <Select
          value={formData.deadline}
          onValueChange={(value) => updateField("deadline", value)}
        >
          <SelectTrigger className="w-full bg-secondary/50 border-border text-foreground">
            <SelectValue placeholder="When do you want to reach your goal?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2-weeks">2 Weeks</SelectItem>
            <SelectItem value="1-month">1 Month</SelectItem>
            <SelectItem value="3-months">3 Months</SelectItem>
            <SelectItem value="6-months">6 Months</SelectItem>
            <SelectItem value="1-year">1 Year</SelectItem>
            <SelectItem value="no-deadline">No Specific Deadline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Challenges */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="challenges"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <AlertTriangle className="size-4 text-primary" />
          Learning Challenges
          <span className="text-muted-foreground text-xs font-normal">
            (Optional)
          </span>
        </Label>
        <Textarea
          id="challenges"
          placeholder="Any specific challenges you face? e.g., staying consistent, understanding theory, time management..."
          value={formData.challenges}
          onChange={(e) => updateField("challenges", e.target.value)}
          className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary min-h-20"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            Generating Your Roadmap...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="size-5 cursor-pointer" />
            Generate Learning Roadmap
          </span>
        )}
      </Button>
    </form>
  );
}

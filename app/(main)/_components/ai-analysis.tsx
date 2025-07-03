"use client";

import { useEffect, useState } from "react";
import { geminiPromptAction } from "@/app/geminiActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BrainCircuit, Loader2 } from "lucide-react";
import MarkdownRenderer from "./markdown-renderer";
import MinimalAmharicMarkdownViewer from "./markdown-renderer";

interface AiAnalysisProps {
  data: string;
}

export default function AiAnalysis({ data }: AiAnalysisProps) {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const res = await geminiPromptAction(data);
        setResult(res);
      } catch (error) {
        setResult("Failed to fetch AI analysis.");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchAnalysis();
    }
  }, [data, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <BrainCircuit className="h-4 w-4" />
          AI analysis
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Analysis</DialogTitle>
          <DialogDescription className="text-black font-normal p-3">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading analysis...
              </span>
            ) : (
              <MinimalAmharicMarkdownViewer
                markdownContent={result || "No analysis available."}
              />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

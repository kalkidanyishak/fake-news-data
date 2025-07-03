//analysis -> analysis
import { getAnalysisById, updateAnalysis } from "@/actions/analysis";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function UpdateAnalysisForm({
  analysis,
}: {
  analysis: any;
}) {

  return (
    analysis && (
      <form
        key={Date.now()}
        action={updateAnalysis}
        className="space-y-4 animate-fade-in"
      >
        <Input type="hidden" name="id" value={analysis.id} />

        <div>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={analysis.title}
          />
        </div>

        <div>
          <label htmlFor="summary">Summary</label>
          <Textarea
            name="summary"
            id="summary"
            defaultValue={analysis.summary}
          />
        </div>

        <div>
          <label htmlFor="additional_context">Additional Context:</label>
          <Input
            type="text"
            name="additional_context"
            id="additional_context"
            defaultValue={analysis.additional_context}
          />
        </div>

        <div>
          <label htmlFor="verdict">Verdict</label>
          <Textarea
            name="verdict"
            id="verdict"
            defaultValue={analysis.verdict}
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          update
        </button>
      </form>
    )
  );
}

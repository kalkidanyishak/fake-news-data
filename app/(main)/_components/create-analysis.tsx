//analysis -> analysis
import {
  createAnalysis,
} from "@/actions/analysis";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function CreateAnalysisForm({claimId}:any) {
  return (
    <form
      key={Date.now()}
      action={createAnalysis}
      className="space-y-4 animate-fade-in"
    >
      <Input type="hidden" name="id" value={claimId} required />

      <div>
        <label htmlFor="title">Title</label>
        <Input type="text" name="title" id="title" required />
      </div>

      <div>
        <label htmlFor="summary">Summary</label>
        <Textarea name="summary" id="summary" required />
      </div>

      <div>
        <label htmlFor="additional_context">Additional Context:</label>
        <Input
          type="text"
          name="additional_context"
          id="additional_context"
          required
        />
      </div>

      <div>
        <label htmlFor="verdict">Verdict</label>
        <Textarea name="verdict" id="verdict" />
      </div>

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        create
      </button>
    </form>
  );
}

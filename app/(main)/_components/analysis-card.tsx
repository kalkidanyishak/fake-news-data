import { deleteEvidence } from "@/actions/evidences";
import UpdateEvidenceForm from "./update-evidence";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UpdateAnalysisForm from "./update-analysis";
import { deleteAnalysis, getAnalysisById } from "@/actions/analysis";

export default async function AnalysisCard({ claimId, analysis }: any) {
  return (
    analysis && (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <UpdateAnalysisForm analysis={analysis} />

        <form action={deleteAnalysis} className="mt-4">
          <Input type="hidden" name="claimId" value={claimId} />
          <Button type="submit">Delete Analysis</Button>
        </form>
      </div>
    )
  );
}

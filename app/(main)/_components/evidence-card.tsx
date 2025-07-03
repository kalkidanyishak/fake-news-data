import { deleteEvidence } from "@/actions/evidences";
import UpdateEvidenceForm from "./update-evidence";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function EvidenceCard({ evidence, claimId }: any) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-[380px]">
      <UpdateEvidenceForm id={evidence.id} claimId={claimId} />

      <form action={deleteEvidence} className="mt-4">
        <Input type="hidden" name="evidenceId" value={evidence.id} />
        <Input type="hidden" name="claimId" value={claimId} />
        <Button type="submit">Delete Evidence</Button>
      </form>
    </div>
  );
}

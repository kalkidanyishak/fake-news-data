import { getEvidenceById, updateEvidence } from "@/actions/evidences";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function UpdateEvidenceForm({ id, claimId }: any) {
  const evidence = await getEvidenceById(id);
  return (
    evidence && (
      <form
        key={Date.now()}
        action={updateEvidence}
        className="space-y-4 animate-fade-in"
      >
        <Input type="hidden" name="claim_id" value={claimId} />
        <Input type="hidden" name="id" value={id} />

        <div>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={evidence.title}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Textarea
            name="description"
            id="description"
            defaultValue={evidence.description}
          />
        </div>

        <div>
          <label htmlFor="relevance">Relevance</label>
          <Input
            type="text"
            name="relevance"
            id="relevance"
            defaultValue={evidence.relevance}
          />
        </div>
        <div>
          <label htmlFor="relevance">sources</label>
          <Textarea
            name="sources"
            id="sources"
            defaultValue={evidence.sources}
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

import { createEvidence } from "@/actions/evidences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateEvidenceFormProps = {
  id: string; // claim_id to be included as hidden Input
};

export default function CreateEvidenceForm({ id }: CreateEvidenceFormProps) {
  return (
    <form action={createEvidence} className="space-y-4">
      <Input type="hidden" name="claim_id" value={id} />

      <div>
        <label htmlFor="title">
          Title
        </label>
        <Input
          type="text"
          name="title"
          id="title"
          required
        />
      </div>

      <div>
        <label htmlFor="description">
          Description
        </label>
        <Textarea
          name="description"
          id="description"
        />
      </div>

      <div>
        <label htmlFor="relevance">
          Relevance
        </label>
        <Input
          type="text"
          name="relevance"
          id="relevance"

        />
      </div>
      <div>
        <label htmlFor="relevance">
          sources
        </label>
        <Textarea
          name="sources"
          id="sources"

        />
      </div>

      <Button
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

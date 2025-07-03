import { getClaimById, updateClaim } from "@/actions/news_claims";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { notFound } from "next/navigation";

export default async function EditClaimPage({
  params,
}: {
  params: any;
}) {
  const claimId = params.id;
  const claim = await getClaimById(claimId);

  if (!claim) {
    notFound();
  }

  return (
    <form action={updateClaim} className="flex flex-col gap-4 max-w-md mx-auto p-3 rounded-lg shadow-sm border m-3">
      {/* Hidden Input to pass the claim ID to the server action */}
      <Input type="hidden" name="claimId" value={claim.id} />

      <label htmlFor="title">
        Title:
        <Input
          id="title"
          name="title"
          type="text"
          className="border p-2 w-full"
          defaultValue={claim.title}
          required
        />
      </label>

      <label htmlFor="summary">
        Summary:
        <Textarea
          id="summary"
          name="summary"
          className="border p-2 w-full"
          rows={4}
          defaultValue={claim.summary ?? ""}
        />
      </label>

      <label htmlFor="category">
        Category:
        <Input
          id="category"
          name="category"
          type="text"
          className="border p-2 w-full"
          defaultValue={claim.category ?? ""}
        />
      </label>

      <label htmlFor="sources">
        Sources:
        <Input
          id="sources"
          name="sources"
          type="text"
          className="border p-2 w-full"
          defaultValue={claim.sources ?? ""}
        />
      </label>

      <label htmlFor="why">
        Why:
        <Textarea
          id="why"
          name="why"
          className="border p-2 w-full"
          rows={3}
          defaultValue={claim.why ?? ""}
        />
      </label>

      <label htmlFor="asker_contact">
        Asker Contact:
        <Input
          id="asker_contact"
          name="asker_contact"
          type="email"
          className="border p-2 w-full"
          defaultValue={claim.asker_contact ?? ""}
        />
      </label>

      {/* Optional: Display server-side errors if not using useFormState */}
      {/* This part would require the server action to return error messages
          and the page component to handle them, which is more complex without useFormState */}

      <Button type="submit">
        Update Claim
      </Button>
    </form>
  );
}

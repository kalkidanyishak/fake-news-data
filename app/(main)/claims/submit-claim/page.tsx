import { createClaim } from "@/actions/news_claims";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function ClaimFormPage() {
  return (
    <form action={createClaim} className="flex flex-col gap-4 max-w-md mx-auto p-3 border m-3 rounded-lg shadow-sm">
      <label>
        Title:
        <Input name="title" type="text" required />
      </label>

      <label>
        Summary: 
        <Textarea name="summary" rows={4} />
      </label>

      <label>
        Category:
        <Input name="category" type="text" />
      </label>

      <label>
        Sources:
        <Input name="sources" type="text" />
      </label>

      <label>
        Why:
        <Textarea name="why" rows={3} />
      </label>

      <label>
        Asker Contact:
        <Input name="asker_contact" type="email" />
      </label>

      <Button type="submit">
        Submit
      </Button>
    </form>
  );
}

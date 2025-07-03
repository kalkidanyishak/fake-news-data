import Link from "next/link";

export default async function SuccessPage({
  params,
}: {
  params:any;
}) {
  const claimId = params.id;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Claim Submitted Successfully!</h1>
      <p className="mb-4">
        Your claim with ID <strong>{claimId}</strong> has been submitted.
      </p>
      <p className="mb-4">You can view or edit your claim at any time.</p>
      <Link
        href={`/claims/submit-claim/${claimId}`}
      >
        Edit Claim
      </Link>
      <Link
        href={`/claims/my-claims`}
      >
        My Claims
      </Link>
    </div>
  );
}

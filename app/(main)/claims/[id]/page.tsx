import { getAnalysisById } from "@/actions/analysis";
import { getEvidenceByClaimId } from "@/actions/evidences";

export default async function ClaimPreview({
  params,
}: {
  params: any;
}) {
  const claimId = params.id;
  const evidences = await getEvidenceByClaimId(claimId);
  const analysis = await getAnalysisById(claimId);

  return (
    <div className="mx-auto p-2 space-y-4">
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Claim Preview
      </h1>

      {/* Evidences Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Evidences</h2>
        {evidences.length > 0 ? (
          <div className="flex justify-start items-center gap-4 ">
            {evidences.map((evidence: any) => (
              <div
                key={evidence.id}
                className="bg-white shadow-sm min-w-[380px] rounded-sm p-4 border hover:shadow-lg transition"
              >
                <p className="text-lg font-medium">{evidence.title}</p>
                <p className="text-gray-700 mt-1">{evidence.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No evidences found for this claim.</p>
        )}
      </section>

      {/* Analysis Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis</h2>
        {analysis ? (
          <div className="p-2">
            <p className="text-lg font-medium">{analysis.title}</p>
            <p className="text-gray-700">
              <span className="font-medium">Summary:</span> {analysis.summary}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Verdict:</span> {analysis.verdict}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No analysis found for this claim.</p>
        )}
      </section>
    </div>
  );
}

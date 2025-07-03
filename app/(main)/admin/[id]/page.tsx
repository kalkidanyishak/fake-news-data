import { getEvidenceByClaimId } from "@/actions/evidences";
import { getClaimById } from "@/actions/news_claims";
import { notFound } from "next/navigation";
import EvidenceCard from "../../_components/evidence-card";
import AnalysisCard from "../../_components/analysis-card";
import PeerModal from "../../_components/peer-modal";
import CreateAnalysisForm from "../../_components/create-analysis";
import { getAnalysisById } from "@/actions/analysis";

export default async function ClaimById({
  params,
}: {
  params: any;
}) {
  const claimId = params.id;
  const claim = await getClaimById(claimId);
  if (!claim) {
    notFound();
  }
  const evidences = await getEvidenceByClaimId(claim.id);
  const analysis = await getAnalysisById(claimId);

  return (
    <div className="flex flex-wrap">
      <div className="p-4 border-r md:max-w-[100%] lg:max-w-[400px]">
        <div className=" mb-2">
          <h1 className="text-2xl font-bold mb-4">
            {claim.title}
          </h1>
        </div>
        <p className="border rounded-md my-2 shadow-sm p-2">{claim.summary}</p>
        <p className="border rounded-md my-2 shadow-sm p-2">{claim.why}</p>
        <p className="border rounded-md my-2 shadow-sm p-2">{claim.sources}</p>

        <p className="px-3 py-1 rounded-full border text-xs inline">
          {" "}
          #{claim.category}
        </p>
      </div>

      <div id="main" className="md:max-w-[100%] lg:max-w-[60%]">
        <section className="flex flex-row flex-wrap m-2">
          <input
            id="tab-one"
            type="radio"
            name="tabs"
            className="peer/tab-one opacity-0 absolute"
            defaultChecked
          />
          <label
            htmlFor="tab-one"
            className=" hover:bg-slate-200 peer-checked/tab-one:bg-amber-200 cursor-default px-2 py-1 rounded-sm block"
          >
            Evidence
          </label>

          <input
            id="tab-two"
            type="radio"
            name="tabs"
            className="peer/tab-two opacity-0 absolute"
          />
          <label
            htmlFor="tab-two"
            className=" hover:bg-slate-200 peer-checked/tab-two:bg-amber-200 cursor-default px-2 py-1 rounded-sm block"
          >
            Analysis
          </label>

          <input
            id="tab-three"
            type="radio"
            name="tabs"
            className="peer/tab-three opacity-0 absolute"
          />
          {/* <label
            htmlFor="tab-three"
            className=" hover:bg-slate-200 peer-checked/tab-three:bg-amber-200 cursor-default p-2 rounded-sm block"
          >
            Verdict
          </label> */}

          <div className="basis-full h-0"></div>

          <div className=" hidden peer-checked/tab-one:block p-4 w-full">
            <div className="flex flex-wrap items-center gap-2">
              {evidences &&
                evidences.map((evidence: any) => (
                  <EvidenceCard
                    key={evidence.id}
                    evidence={evidence}
                    claimId={claimId}
                  />
                ))}
            </div>
          </div>
          <div className=" hidden peer-checked/tab-two:block p-4 w-full">
            {!analysis && (
              <PeerModal id="add-analysis" triggerLabel="Add Analysis">
                <CreateAnalysisForm claimId={claimId} />
              </PeerModal>
            )}
            {analysis && <AnalysisCard analysis={analysis} claimId={claimId} />}
          </div>
          {/* <div className=" hidden peer-checked/tab-three:block p-4 w-full">
            Third tab pane
          </div> */}
        </section>
      </div>
    </div>
  );
}

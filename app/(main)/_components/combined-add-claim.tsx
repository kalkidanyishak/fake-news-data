import { Send } from "lucide-react";
import ClaimFormPage from "../claims/submit-claim/page";
import PeerModal from "./peer-modal";

export default async function CombinedAddClaim() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <PeerModal
        id="submit-claim"
        triggerLabel={
          <>
            <Send className="h-4 w-4 mr-1" /> Submit claim
          </>
        }
      >
        <ClaimFormPage />
      </PeerModal>
    </div>
  );
}

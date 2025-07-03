import CombinedAddClaim from "../../_components/combined-add-claim";

export default function CombinedLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <CombinedAddClaim key={Date.now()}/>
        {children}
    </div>
  );

}
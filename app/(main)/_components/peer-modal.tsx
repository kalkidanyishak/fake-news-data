import React, { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type PeerModalProps = {
  id: string;
  triggerLabel: ReactNode | string;
  children: ReactNode;
};

const PeerModal: React.FC<PeerModalProps> = ({ id, triggerLabel, children }) => (
  <div className="relative">
    {/* Hidden checkbox to toggle modal */}
    <Input
      type="checkbox"
      id={`modal-toggle-${id}`}
      className="peer hidden"
    />

    {/* Trigger Label */}
    <label
      htmlFor={`modal-toggle-${id}`}
     className="flex text-[12px] font-semibold py-1.5 px-2 border rounded-md justify-center items-center ">
      {triggerLabel}
    </label>

    {/* Modal overlay and content */}
    <div className="fixed left-0 top-0 w-full h-screen opacity-0 max-h-0 peer-checked:opacity-100 peer-checked:backdrop-brightness-50 peer-checked:max-h-screen transition-transform overflow-hidden z-10">
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white border shadow-lg rounded-lg p-4 mt-4 max-w-xl w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Modal</h2>
            <label
              htmlFor={`modal-toggle-${id}`}
              className="cursor-pointer py-2 rounded-lg select-none"
            >
              <X />
            </label>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  </div>
);

export default PeerModal;

import { PanelLeft, X } from "lucide-react";
import AskForm from "./AskForm.jsx";
import AppName from "./AppName.jsx";
import UserHistory from "./UserHistory.jsx";

const now = Date.now();
const mock = [
  { id: 1, question: "1st law of motion" },
  { id: 2, question: "Newton's 2nd law" },
  {
    id: 3,
    question: "Kinetic energy formula",
  },
  { id: 4, question: "Projectile motion" },
  {
    id: 5,
    question: "Conservation of energy",
    createdAt: now - 5 * 86400 * 1000,
  },
  { id: 6, question: "Rotational motion" },
];

export default function Sidebar({ onAsk }) {
  return (
    <div className="drawer w-auto">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <span className="drawer-content">
        <label htmlFor="my-drawer-1" className="btn drawer-button">
          <PanelLeft size={18} />
        </label>
      </span>

      <div className="drawer-side overflow-y-hidden">
  <label
    htmlFor="my-drawer-1"
    aria-label="close sidebar"
    className="drawer-overlay"
  ></label>

  <div className="bg-base-100 h-full w-80 flex flex-col overflow-hidden border-r border-base-300 shadow-xl">
    {/* header */}
    <div className="flex items-center justify-between border-b border-base-300 p-3">
      <AppName />
      <label
        htmlFor="my-drawer-1"
        className="btn btn-ghost btn-sm btn-circle"
        aria-label="Close sidebar"
      >
        <X size={20} />
      </label>
    </div>

    {/* body */}
    <div className="flex min-h-0 flex-1 flex-col gap-2 p-5">
      <AskForm onAsk={onAsk} />
      <div className="divider my-0" />
      <UserHistory items={mock} activeId={1} />
    </div>
  </div>
</div>
    </div>
  );
}

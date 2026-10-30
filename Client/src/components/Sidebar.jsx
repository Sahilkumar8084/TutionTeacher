import { PanelLeft } from "lucide-react";
import AskForm from "./AskForm.jsx";
export default function Sidebar({ onAsk }) {
  return (
    <div className="drawer w-auto">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <span className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-1" className="btn drawer-button">
          <PanelLeft size={18} />
        </label>
      </span>
     <div className="drawer-side">
  <label
    htmlFor="my-drawer-1"
    aria-label="close sidebar"
    className="drawer-overlay"
  ></label>

  <div className="bg-base-300 min-h-full w-80 p-5 ">
    <AskForm onAsk={onAsk} />
  </div>
</div>
    </div>
  );
}

import {Mic} from "lucide-react"
export default function Microphone({ onMic }) {
  return (
    <button
      className="btn btn-circle btn-primary"
      onClick={onMic}
      aria-label="Mic"
    >
      <Mic size={18}/>
    </button>
  );
}

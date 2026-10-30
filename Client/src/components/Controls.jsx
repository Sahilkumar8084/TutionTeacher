import Microphone from "./Microphone.jsx";
import { Play,Pause ,ChevronLeft ,ChevronRight} from 'lucide-react';
export default function Controls({
  current,
  last,
  isPlaying = false,
  onPrev,
  onNext,
  onPlayAll,
  onReset,
  onMic,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3  rounded-lg bg-base-100">
      <button
        className="btn  rounded-xl"
        disabled={current <= 0}
        onClick={onPrev}
      >
        <ChevronLeft size={20} />Previous
      </button>

      <div className="flex items-center gap-4">
        <button className="btn btn-ghost text-primary rounded-xl bg-primary/10" onClick={onPlayAll}>
          {isPlaying ? <><Pause size={16}/> Pause</> : <><Play size={16}/> Play</> }
        </button>
        <button className="btn btn-ghost rounded-xl border-primary/10" onClick={onReset}>
          ↺ Reset
        </button>
        <Microphone onMic={onMic} />
      </div>

      <button
        className="btn btn-primary opacity-90 rounded-xl"
        disabled={current === last}
        onClick={onNext}
      >
        {current === last ? "Finished ✓" : <>Next step<ChevronRight size={20}/></>}
      </button>
    </div>
  );
}

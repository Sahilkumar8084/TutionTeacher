import {
  BoardCanvas,
  Title,
  Steps,
  Explanation,
  Controls,
  Sidebar,
} from "../components";
import { useExplainMutation, BOARD_KEY } from "../store/apiSlice.js";
import { useEffect, useState } from "react";

const MS_PER_SHAPE = 500; // BoardCanvas ke STAGGER (0.5s) ke barabar
const STEP_EXTRA_MS = 1800; // animation khatam hone + thoda ruk-ne ka time

export default function LearningWorkspace() {
  const [question, setQuestion] = useState("");
  const [current, setCurrent] = useState(0); // -1 = board khali
  const [run, setRun] = useState(0); // board ko dobara mount karne ke liye
  const [isPlaying, setIsPlaying] = useState(false);
  const [, { data }] = useExplainMutation({ fixedCacheKey: BOARD_KEY });
  const NO_STEPS = [];
  const steps = data?.steps ?? NO_STEPS;
  const last = steps.length - 1;

  const playing = isPlaying && current < last;

  useEffect(() => {
    if (!playing) return;
    const shapes = steps[current]?.draw.length ?? 0;
    const wait = Math.max(shapes, 1) * MS_PER_SHAPE + STEP_EXTRA_MS;
    const timer = setTimeout(() => setCurrent((c) => c + 1), wait);
    return () => clearTimeout(timer);
  }, [playing, current, steps]);

  // naya sawal poochhne par step 1 se shuru
  const handleAsk = (text) => {
    setQuestion(text);
    setCurrent(0);
    setIsPlaying(false);
  };

  const goTo = (i) => {
    setIsPlaying(false);
    setCurrent(i);
  };

  const handlePlayAll = () => {
    if (playing) return setIsPlaying(false); // pause
    if (current < 0 || current >= last) {
      setCurrent(0);
      setRun((r) => r + 1);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrent(-1); // sab clear
    setRun((r) => r + 1);
  };

  if (!data) return <Sidebar onAsk={handleAsk} />;

  return (
    <div className="min-h-screen bg-base-200">
      <main className=" mx-auto p-2">
        <div className="p-2">
          <div className="flex items-center gap-2 pb-1">
            <Sidebar onAsk={handleAsk} />
            <Title question={question} />
          </div>
          <div className="card shadow ">
            <div className="card-body py-5">
              <Steps steps={steps} currentStep={current} onSelect={goTo} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-stretch p-2">
          <div className="lg:col-span-2">
            <Explanation
              step={steps[current]}
              index={current}
              total={steps.length}
            />
          </div>
          <div className="lg:col-span-3 card bg-base-100 shadow ">
            <BoardCanvas key={run} steps={steps} currentStep={current} />
          </div>
        </div>

        <Controls
          current={current}
          last={last}
          isPlaying={playing}
          onPrev={() => goTo(current - 1)}
          onNext={() => goTo(current + 1)}
          onPlayAll={handlePlayAll}
          onReset={handleReset}
        />
      </main>
    </div>
  );
}

export default function Steps({ steps = [], currentStep = 0, onSelect }) {
  return (
    <div className="overflow-x-auto">
      <ul className="steps w-full min-w-lg">
        {steps.map((s, i) => (
          <li
            key={i}
            className={`step text-sm ${i <= currentStep ? "step-primary" : ""} ${onSelect ? "cursor-pointer" : ""}`}
            onClick={() => onSelect?.(i)}
          >
            {s.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

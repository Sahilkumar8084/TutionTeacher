export default function Explanation({ step, index, total }) {
  if (!step)
    return (
      <div className="card bg-base-100 shadow h-full">
        <div className="card-body items-center justify-center text-center opacity-70">
          <p>Click Play Button</p>
        </div>
      </div>
    );
  return (
    <div className="card bg-base-100 shadow h-full">
      <div className="card-body">
        <div className="badge badge-primary badge-outline">
          Step {index + 1} / {total}
        </div>
        <h2 className="card-title text-2xl mt-1">{step.title}</h2>
        <p className="text-base leading-relaxed opacity-90">{step.say}</p>
      </div>
    </div>
  );
}

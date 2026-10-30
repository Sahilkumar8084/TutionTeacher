import { motion } from "framer-motion";
import { CANVAS } from "../config.js";
const W = CANVAS.width;
const H = CANVAS.height;

const STAGGER = 0.5; // har shape ke beech delay (seconds)
const FONT = "'Caveat', 'Patrick Hand', cursive";

const PALETTE = {
  black: "#2b2b2b",
  red: "#e03e3e",
  blue: "#3b5bdb",
  green: "#2f9e44",
  orange: "#f08c00",
  purple: "#7048e8",
};

// unknown colour aaye to crash nahi, black le lo
const colorName = (c) => (c in PALETTE ? c : "black");
const hex = (c) => PALETTE[colorName(c)];

// animate=true -> draw hote hue dikhao, false -> seedha final state
const mp = (animate, from, to, transition) =>
  animate
    ? { initial: from, animate: to, transition }
    : { initial: false, animate: to };

function Shape({ shape, animate, delay }) {
  const color = hex(shape.c);
  const stroke = {
    stroke: color,
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (shape.t) {
    case "line": {
      const a = shape.arrow;
      const id = `url(#arrow-${colorName(shape.c)})`;
      return (
        <motion.line
          x1={shape.x1}
          y1={shape.y1}
          x2={shape.x2}
          y2={shape.y2}
          {...stroke}
          markerStart={a === "both" || a === "start" ? id : undefined}
          markerEnd={a === "both" || a === "end" ? id : undefined}
          {...mp(
            animate,
            { pathLength: 0, opacity: 0 },
            { pathLength: 1, opacity: 1 },
            { duration: 0.8, delay, ease: "easeInOut" },
          )}
        />
      );
    }
    case "circle":
      return (
        <motion.circle
          cx={shape.x}
          cy={shape.y}
          r={shape.r}
          {...stroke}
          fill={color}
          {...mp(
            animate,
            { pathLength: 0, fillOpacity: 0 },
            { pathLength: 1, fillOpacity: shape.fill ? 0.15 : 0 },
            {
              pathLength: { duration: 0.8, delay, ease: "easeInOut" },
              fillOpacity: { duration: 0.4, delay: delay + 0.6 },
            },
          )}
        />
      );
    case "text":
      return (
        <motion.text
          x={shape.x}
          y={shape.y}
          fill={color}
          fontSize={shape.size ?? 24}
          fontFamily={FONT}
          fontWeight={600}
          {...mp(
            animate,
            { opacity: 0 },
            { opacity: 1 },
            { duration: 0.5, delay },
          )}
        >
          {shape.s}
        </motion.text>
      );
    case "dot":
      return (
        <motion.circle
          cx={shape.x}
          cy={shape.y}
          fill={color}
          {...mp(
            animate,
            { r: 0 },
            { r: 7 },
            { type: "spring", stiffness: 300, damping: 15, delay },
          )}
        />
      );
    case "tri": {
      const { x, y, s } = shape;
      const h = s * 0.87;
      return (
        <motion.polygon
          points={`${x},${y} ${x - s / 2},${y + h} ${x + s / 2},${y + h}`}
          {...stroke}
          fill={color}
          {...mp(
            animate,
            { pathLength: 0, fillOpacity: 0 },
            { pathLength: 1, fillOpacity: 0.2 },
            {
              pathLength: { duration: 0.8, delay, ease: "easeInOut" },
              fillOpacity: { duration: 0.4, delay: delay + 0.6 },
            },
          )}
        />
      );
    }
    default:
      return null; // unknown shape type ko ignore karo
  }
}

// currentStep diya to Previous/Next wala step view, nahi diya to saare steps ek saath
export default function BoardCanvas({ steps = [], currentStep }) {
  const showAll = currentStep == null;
  const visible = showAll ? steps : steps.slice(0, currentStep + 1);
  let order = 0;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }}
    >
      <defs>
        <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="#e9e7f5" strokeWidth="1" />
        </pattern>
        {Object.keys(PALETTE).map((name) => (
          <marker
            key={name}
            id={`arrow-${name}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M1 1 L9 5 L1 9"
              fill="none"
              stroke={PALETTE[name]}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        ))}
      </defs>

      <rect width={W} height={H} fill="#fdfcf8" />
      <rect width={W} height={H} fill="url(#grid)" />

      {visible.map((step, si) => {
        const isCurrent = showAll || si === currentStep;
        return (
          <g key={si}>
            {step.draw.map((shape, i) => (
              <Shape
                key={i}
                shape={shape}
                animate={isCurrent}
                delay={(showAll ? order++ : i) * STAGGER}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

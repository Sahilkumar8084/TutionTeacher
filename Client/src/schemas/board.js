import { z } from "zod";

export const COLORS = ["black", "red", "blue", "green", "orange", "purple"];
const color = z.enum(COLORS);
const num = z.number();

const shape = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("line"),
    x1: num,
    y1: num,
    x2: num,
    y2: num,
    c: color,
    arrow: z.enum(["none", "start", "end", "both"]).optional(),
  }),
  z.object({
    t: z.literal("circle"),
    x: num,
    y: num,
    r: num,
    c: color,
    fill: z.boolean().optional(),
  }),
  z.object({
    t: z.literal("text"),
    x: num,
    y: num,
    s: z.string(),
    c: color,
    size: num.optional(),
  }),
  z.object({ t: z.literal("dot"), x: num, y: num, c: color }),
  z.object({ t: z.literal("tri"), x: num, y: num, s: num, c: color }),
]);

export const boardSchema = z.object({
  steps: z
    .array(
      z.object({
        title: z.string(),
        say: z.string(),
        draw: z.array(shape),
      }),
    )
    .min(1),
});

const GRADIENTS = [
  "gradient-orange-red",
  "gradient-cyan-indigo",
  "gradient-fuchsia-rose",
  "gradient-green-teal",
  "gradient-amber-red",
  "gradient-lime-emerald",
  "gradient-red-purple",
  "gradient-purple-indigo",
  "gradient-teal-blue",
  "gradient-emerald-cyan",
  "gradient-blue-violet",
  "gradient-yellow-orange",
  "gradient-rose-purple",
  "gradient-sky-cyan",
  "gradient-pink-rose",
  "gradient-indigo-fuchsia",
  "gradient-purple-indigo",
  "gradient-violet-fuchsia",
  "gradient-blue-purple",
] as const;

type GradientClass = (typeof GRADIENTS)[number];

export const getGradient = (index: number): GradientClass => {
  return GRADIENTS[index % GRADIENTS.length];
};

// Builds a smooth, festooned (wax-seal style) circle outline as an SVG path,
// by modulating the radius with a sine wave and smoothing the resulting
// points with a Catmull-Rom -> cubic Bezier conversion.
export function scallopedCirclePath(
  cx: number,
  cy: number,
  radius: number,
  amplitude: number,
  bumps: number,
  samples = 120
): string {
  const points: [number, number][] = [];
  for (let i = 0; i < samples; i++) {
    const theta = (i / samples) * Math.PI * 2;
    const r = radius + amplitude * Math.sin(bumps * theta);
    points.push([cx + r * Math.cos(theta), cy + r * Math.sin(theta)]);
  }

  const n = points.length;
  const at = (i: number) => points[(i + n) % n];

  let d = `M ${at(0)[0].toFixed(2)} ${at(0)[1].toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  d += "Z";
  return d;
}

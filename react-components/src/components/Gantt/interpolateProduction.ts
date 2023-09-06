import { hsv, interpolateHsvLong } from 'd3-hsv';
import * as d3 from 'd3';

const COLORS = ['#0A8A65', '#58A248', '#F4A30B', '#F36D1C', '#E24C3C'];

const i0 = interpolateHsvLong(
  hsv(d3.color(COLORS[1])!),
  hsv(d3.color(COLORS[0])!),
);
const i1 = interpolateHsvLong(
  hsv(d3.color(COLORS[2])!),
  hsv(d3.color(COLORS[1])!),
);
const i2 = interpolateHsvLong(
  hsv(d3.color(COLORS[3])!),
  hsv(d3.color(COLORS[2])!),
);
const i3 = interpolateHsvLong(
  hsv(d3.color(COLORS[4])!),
  hsv(d3.color(COLORS[3])!),
);

export const interpolateProduction = (t: number) => {
  if (t < 0.1) {
    return i3(t * 10);
  }

  if (t < 0.2 && t > 0.1) {
    return i2((t - 0.1) * 10);
  }

  if (t < 0.6 && t > 0.2) {
    return i1((t - 0.2) * 2.5);
  }

  return i0((t - 0.6) * 2.5);
};

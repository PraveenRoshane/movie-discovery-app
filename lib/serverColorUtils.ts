import { Vibrant } from "node-vibrant/node";

export async function extractColorFromUrlServer(url: string): Promise<string> {
  const palette = await Vibrant.from(url).getPalette();
  const dominant = palette.Vibrant || palette.Muted || palette.DarkVibrant;
  if (dominant?.rgb) {
    return `rgba(${Math.round(dominant.rgb[0])}, ${Math.round(dominant.rgb[1])}, ${Math.round(dominant.rgb[2])}, 0.3)`;
  }
  return `rgba(0, 0, 0, 0.3)`
}
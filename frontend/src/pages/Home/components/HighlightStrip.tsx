import Pill from "./ui/Pill";
import { highlightPills } from "../data";

export default function HighlightStrip() {
  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {highlightPills.map((p) => (
        <Pill key={p.label} icon={p.icon}>
          {p.label}
        </Pill>
      ))}
    </div>
  );
}

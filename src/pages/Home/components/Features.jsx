import Card from "./ui/Card";
import { features } from "../data";

export default function Features() {
  return (
    <section className="relative overflow-hidden px-6 md:px-16 py-20 bg-secondary-50/40">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block mb-4 rounded-full border px-3 py-1 text-xs font-medium text-secondary-700 bg-secondary-100">
          Built for hiring velocity
        </span>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Why <span className="text-primary-600">JobHop</span>?
        </h2>
        <p className="mt-4 text-secondary-600 md:text-lg">
          Turn weeks of sourcing into hours. JobHop connects companies and
          freelancers with precision matching, trusted workflows, and a
          marketplace designed for outcomes; not busywork.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f) => (
          <Card key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
        ))}
      </div>
    </section>
  );
}

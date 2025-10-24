import { testimonials } from "../data";

export default function Testimonials() {
  return (
    <div className="max-w-6xl mx-auto mt-16">
      <h3 className="text-xl text-secondary-700 md:text-2xl font-semibold mb-4">
        Loved by teams and independents
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="min-w-[280px] md:min-w-[360px] snap-start rounded-2xl border border-secondary-200/60 bg-secondary-0/80 p-6"
          >
            <p className="text-secondary-800">“{t.quote}”</p>
            <div className="mt-4 text-sm text-secondary-600">
              <span className="font-medium text-secondary-800">{t.name}</span> ·{" "}
              {t.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

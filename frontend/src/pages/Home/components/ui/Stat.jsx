export default function Stat({ value, label }) {
  return (
    <div className="rounded-xl border p-4 text-center bg-secondary-0/70">
      <p className="text-2xl md:text-3xl font-bold text-secondary-900">
        {value}
      </p>
      <p className="text-xs md:text-sm text-secondary-600">{label}</p>
    </div>
  );
}

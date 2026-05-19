export default function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border bg-secondary-0 px-3 py-2 text-sm text-secondary-700">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}

import React from "react";

export default function Card({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-secondary-200/60 bg-secondary-0 p-5 shadow-sm transition-all duration-200 ease-in hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary-50">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
      </div>
      <p className="mt-3 text-secondary-700">{desc}</p>
    </div>
  );
}

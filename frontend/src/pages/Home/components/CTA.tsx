import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto my-16">
      <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-r from-primary-600 to-primary-500 text-secondary-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h4 className="text-2xl md:text-3xl font-semibold">
            Make your next great hire or your next great leap.
          </h4>
          <p className="mt-2 text-secondary-0/90">
            Join JobHop today and turn opportunities into outcomes.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/auth")}
            className="rounded-2xl bg-secondary-0 text-primary-700 px-4 py-2 text-sm font-medium hover:bg-secondary-0/90"
          >
            Create free account
          </button>
          <button
            onClick={() =>
              (window.location.href = "mailto:arian.maki@yahoo.com")
            }
            className="rounded-2xl border border-secondary-0/60 px-4 py-2 text-sm font-medium text-secondary-0 hover:bg-secondary-0/10"
          >
            Talk to sales
          </button>
        </div>
      </div>
    </div>
  );
}

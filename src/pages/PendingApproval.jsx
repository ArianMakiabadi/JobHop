import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PendingApproval() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="flex flex-col items-center gap-1 max-w-md">
        <div className="bg-primary-100 text-primary-600 p-5 rounded-full">
          <FaClock className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold text-secondary-800">
          Account Under Review
        </h1>

        <p className="text-secondary-600 text-sm leading-relaxed">
          Your account is currently under review by an administrator. You'll be
          notified once it's approved and ready to use.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2.5 rounded-lg bg-primary-600 text-secondary-0 font-semibold hover:bg-primary-700 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

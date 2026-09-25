import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-secondary-50 text-secondary-700">
      <div className="flex flex-col items-center text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-secondary-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-3">Page Not Found</h2>
        <p className="text-secondary-600 mb-4 text-sm">
          Oops! We couldn’t find the page you were looking for. It might have
          been moved or deleted; let’s take you back!
        </p>
        <button
          onClick={goBack}
          className="px-6 py-3 bg-primary-600 text-secondary-0 rounded-xl font-semibold hover:bg-primary-700 transition shadow-sm"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

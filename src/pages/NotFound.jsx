import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-secondary-800">404</h1>
      <p className="mt-4 text-lg text-secondary-600 text-center">
        Page not found
      </p>
      <button onClick={goHome} className="mt-6 px-6 py-3 btn btn--primary">
        Go Home
      </button>
    </div>
  );
}

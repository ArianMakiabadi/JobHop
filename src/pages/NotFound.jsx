export default function NotFound() {
  const goHome = () => (window.location.href = "/");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600 text-center">Page not found</p>
      <button onClick={goHome} className="mt-6 px-6 py-3 btn btn--primary">
        Go Home
      </button>
    </div>
  );
}

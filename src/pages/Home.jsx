import {
  FiArrowRight,
  FiUsers,
  FiBriefcase,
  FiStar,
  FiChevronsDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-secondary-100">
      {/* Hero Section */}
      <section className="relative grid place-items-center min-h-screen px-6 md:px-16 py-24 text-center overflow-hidden">
        {/* Background gradient shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-100 opacity-20 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary-100 opacity-20 -z-10"></div>

        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <span className="inline-block rounded-full bg-secondary-100 px-3 py-1.5 text-xs font-semibold text-secondary-700">
            Demo version!
          </span>

          {/* Headline with gradient emphasis */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-secondary-900">
            Connect <span className="text-primary-600">freelancers</span> with{" "}
            <span className="text-secondary-600">top employers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-secondary-700 text-lg md:text-xl">
            Browse projects, showcase your skills, or hire top talent; all in
            one place. Everything you need for freelance success.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-secondary-0 text-lg font-medium transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
            >
              Start for free
              <FiArrowRight className="text-lg" />
            </button>

            <button
              onClick={() => navigate("/learn-more")}
              className="inline-flex items-center gap-2 rounded-full border border-primary-600 px-8 py-3 text-primary-600 text-lg font-medium transition hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-200"
            >
              Learn more
            </button>
          </div>

          {/* Stats */}
          <div className="pt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <span className="block text-2xl font-bold text-primary-600">
                500+
              </span>
              <span className="block text-secondary-600 text-sm">
                Freelancers
              </span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-primary-600">
                100+
              </span>
              <span className="block text-secondary-600 text-sm">Projects</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-primary-600">
                50+
              </span>
              <span className="block text-secondary-600 text-sm">
                Employers
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <FiChevronsDown className="w-8 h-8 text-primary-600 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-20 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-600 mb-12">
          Why JobHop?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-secondary-0 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FiUsers className="text-primary-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Connect
            </h3>
            <p className="text-secondary-600">
              Quickly connect with top employers and freelancers worldwide.
            </p>
          </div>

          <div className="bg-secondary-0 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FiBriefcase className="text-primary-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Projects
            </h3>
            <p className="text-secondary-600">
              Browse and manage freelance projects efficiently in one place.
            </p>
          </div>

          <div className="bg-secondary-0 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FiStar className="text-primary-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Top Talent
            </h3>
            <p className="text-secondary-600">
              Hire or showcase the best talent with our trusted platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-24 px-6 md:px-16 text-center rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-6">
          Ready to get started?
        </h2>
        <p className="text-secondary-700 mb-8 max-w-2xl mx-auto">
          Join JobHop today and take your freelance career or hiring process to
          the next level.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-secondary-0 text-lg font-medium transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          Start for free
          <FiArrowRight className="text-lg" />
        </button>
      </section>
    </main>
  );
};

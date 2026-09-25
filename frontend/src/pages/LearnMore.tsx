import {
  FiUsers,
  FiBriefcase,
  FiStar,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const LearnMore = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-secondary-100">
      {/* Hero */}
      <section className="text-center px-6 md:px-16 pt-20 pb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-4">
          Why JobHop is the Best Platform for Freelancers & Employers
        </h1>
        <p className="text-secondary-700 text-lg md:text-xl max-w-2xl mx-auto">
          From finding top talent to landing your next freelance project, JobHop
          gives you all the tools you need to succeed in the modern job market.
        </p>
      </section>

      {/* Features / Benefits */}
      <section className="px-6 md:px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-secondary-0 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FiUsers className="text-primary-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Connect Easily
            </h3>
            <p className="text-secondary-600">
              Quickly connect with verified freelancers and employers around the
              world.
            </p>
          </div>

          <div className="bg-secondary-0 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FiBriefcase className="text-primary-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Manage Projects
            </h3>
            <p className="text-secondary-600">
              Post, browse, and manage projects with ease using our intuitive
              dashboard.
            </p>
          </div>

          <div className="bg-secondary-0 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
            <FiStar className="text-primary-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">
              Hire Top Talent
            </h3>
            <p className="text-secondary-600">
              Find and hire the best freelancers, or get hired by top employers.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Section */}
      <section className="px-6 md:px-16 pb-28 bg-primary-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600">
              Built for Productivity
            </h2>
            <p className="text-secondary-700 text-lg md:text-xl">
              JobHop is designed to streamline every step of your freelance or
              hiring journey. Track projects, communicate efficiently, and get
              results faster.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-secondary-700">
                <FiCheckCircle className="text-primary-600" />
                Easy project tracking
              </li>
              <li className="flex items-center gap-2 text-secondary-700">
                <FiCheckCircle className="text-primary-600" />
                Secure messaging
              </li>
              <li className="flex items-center gap-2 text-secondary-700">
                <FiCheckCircle className="text-primary-600" />
                Verified freelancers & employers
              </li>
            </ul>
          </div>
          <div className="bg-secondary-0 rounded-xl shadow-lg h-64 flex items-center justify-center p-1">
            <img
              src="Productivity.png"
              alt="Productivity"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* CTA at bottom */}
      <section className="text-center px-6 md:px-16 pb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-6">
          Ready to get started?
        </h2>
        <p className="text-secondary-700 mb-8 max-w-2xl mx-auto">
          Join JobHop today and take your freelance career or hiring process to
          the next level.
        </p>
        <button
          onClick={() => {
            navigate("/auth");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-secondary-0 text-lg font-medium transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          Start for free
          <FiArrowRight className="text-lg" />
        </button>
      </section>
    </main>
  );
};

import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiChevronsDown } from "react-icons/fi";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center  min-h-screen px-6 md:px-16 pt-16 md:pt-32 text-center overflow-hidden">
      <div className="max-w-3xl">
        <h1 className="text-primary-600 font-extrabold text-8xl md:text-9xl mb-10 md:mb-14">
          JobHop!
        </h1>
        <h2 className="text-secondary-900 font-bold text-5xl mb-14">
          Connects freelancers with top employers
        </h2>

        <p className="text-secondary-500 text-lg md:text-xl md:mb-8">
          Browse projects, showcase your skills, or hire top talents; all in one
          place.
          <br />
          Everything you need for freelance success.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10 md:pt-0">
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

        <div className="pt-4 md:pt-12 grid grid-cols-3 gap-6 text-center text-2xl md:text-3xl font-bold text-primary-600">
          <div>
            <span className="block ">500+</span>
            <span className="block text-secondary-600 text-sm">
              Freelancers
            </span>
          </div>
          <div>
            <span className="block ">100+</span>
            <span className="block text-secondary-600 text-sm">Projects</span>
          </div>
          <div>
            <span className="block ">50+</span>
            <span className="block text-secondary-600 text-sm">Employers</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 sm:bottom-48 left-1/2 -translate-x-1/2">
        <FiChevronsDown className="w-8 h-8 sm:w-14 md:h-14 text-primary-600 animate-bounce" />
      </div>
    </section>
  );
}

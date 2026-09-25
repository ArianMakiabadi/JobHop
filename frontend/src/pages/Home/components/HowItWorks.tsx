import { RiRocketLine } from "react-icons/ri";
import { FiGrid, FiMessageSquare, FiTrendingUp } from "react-icons/fi";
import { BsFillWalletFill } from "react-icons/bs";
import Stat from "./ui/Stat";
import { stats } from "../data";

export default function HowItWorks() {
  return (
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div className="rounded-2xl border border-secondary-200/60 bg-secondary-0 p-6">
        <div className="flex items-center gap-2 text-secondary-900 font-semibold">
          <RiRocketLine className="h-5 w-5 text-primary-600" /> How JobHop Works
        </div>
        <ol className="mt-6 space-y-6">
          <li className="flex items-start gap-4">
            <FiGrid className="mt-1 h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-secondary-900">
                1. Post or explore
              </p>
              <p className="text-secondary-700">
                Spin up a project in minutes or search roles with smart filters.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <FiMessageSquare className="mt-1 h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-secondary-900">2. Match & bid</p>
              <p className="text-secondary-700">
                Send a bid to the employeer with your desired pay.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <BsFillWalletFill className="mt-1 h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-secondary-900">
                3. Deliver & get paid
              </p>
              <p className="text-secondary-700">
                Milestones, and automated invoices keep work flowing.
              </p>
            </div>
          </li>
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="rounded-2xl bg-primary-600 text-secondary-0 px-4 py-2 text-sm font-medium hover:bg-primary-700">
            Get started
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-secondary-200/60 bg-secondary-0/80 p-6">
        <div className="flex items-center gap-2 text-secondary-900 font-semibold">
          <span className="h-5 w-5 text-primary-600">
            <FiTrendingUp />
          </span>{" "}
          Proof in the numbers
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
        <p className="mt-3 text-xs text-secondary-500">
          *Metrics shown for illustration in this demo.
        </p>
      </div>
    </div>
  );
}

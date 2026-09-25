import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { employerTabs, freelancerTabs } from "../data";

export default function TabsSection() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto mt-16">
      <Tab.Group>
        <Tab.List className="grid grid-cols-2 rounded-xl border bg-secondary-0/80 p-1">
          {["For Employers", "For Freelancers"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `rounded-lg px-4 py-2 text-sm font-medium focus:outline-none transition ${
                  selected
                    ? "bg-primary-600 text-secondary-0"
                    : "text-secondary-800 hover:bg-secondary-50"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {employerTabs.map((i) => (
                <div
                  key={i.text}
                  className="flex items-start gap-3 rounded-lg border bg-secondary-0/70 p-4"
                >
                  <i.icon className="h-5 w-5 text-primary-600 mt-1" />
                  <p className="text-secondary-700">{i.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="rounded-2xl bg-primary-600 text-secondary-0 px-4 py-2 text-sm font-medium hover:bg-primary-700"
              >
                Post a job
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="rounded-2xl border px-4 py-2 text-sm font-medium text-secondary-800 hover:bg-secondary-50"
              >
                Browse talent
              </button>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelancerTabs.map((i) => (
                <div
                  key={i.text}
                  className="flex items-start gap-3 rounded-lg border bg-secondary-0/70 p-4"
                >
                  <i.icon className="h-5 w-5 text-primary-600 mt-1" />
                  <p className="text-secondary-700">{i.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="rounded-2xl bg-primary-600 text-secondary-0 px-4 py-2 text-sm font-medium hover:bg-primary-700"
              >
                Find work
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="rounded-2xl border px-4 py-2 text-sm font-medium text-secondary-800 hover:bg-secondary-50"
              >
                Create profile
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

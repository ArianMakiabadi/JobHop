import { Disclosure } from "@headlessui/react";
import { faq } from "../data";
import { FiChevronDown } from "react-icons/fi";

export default function FAQ() {
  return (
    <div className="max-w-5xl mx-auto mt-16 divide-y rounded-2xl border bg-secondary-0/80">
      {faq.map((f, i) => (
        <Disclosure as="div" key={i} className="px-5">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between py-4 text-left text-secondary-900 font-medium">
                {f.q}
                <FiChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Disclosure.Panel
                  static
                  className="pb-4 -mt-1 text-secondary-500"
                >
                  {f.a}
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

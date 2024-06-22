import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";

export default function Test({ filteredData }) {
  const [toggles, setToggles] = useState(
    Array(filteredData.length).fill(false)
  );
  useEffect(() => {
    setToggles(Array(filteredData.length).fill(false));
  }, [filteredData]);
  const { t } = useTranslation("help");
  // Function to toggle the state of a specific item
  const toggleFAQ = (index) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };
  return (
    <div>
      <ul className="w-full border border-solid border-gray-300 rounded-md ">
        {filteredData.map((item, index) => (
          <li key={index} className={`border-b w-full px-5`}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left md:text-lg border-base-content/10"
              onClick={() => toggleFAQ(index)}
              aria-expanded={toggles[index] ? "true" : "false"}
            >
              <span className="flex-1 text-base-content">{t(item.title)}</span>
              <svg
                className="flex-shrink-0 w-2 h-2 ml-auto fill-current transform transition duration-200 ease-out"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Icon for the minus sign */}
                {toggles[index] ? (
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className="transform origin-center transition duration-200 ease-out rotate-0"
                  ></rect>
                ) : (
                  <>
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transform origin-center transition duration-200 ease-out rotate-90"
                    ></rect>
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transform origin-center transition duration-200 ease-out rotate-0"
                    ></rect>
                  </>
                )}
              </svg>
            </button>
            <div
              className={`transition-all duration-200 ease-in-out max-h-0 overflow-hidden ${
                toggles[index] ? "max-h-full" : ""
              }`}
              style={{
                transition: "max-height 0.3s ease-in-out 0s",
              }}
            >
              <div className="pb-5 leading-relaxed">
                {/* {t(item.description)} */}
                <div
                  className="space-y-2 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t(item.description),
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

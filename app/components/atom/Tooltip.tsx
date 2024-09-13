import React from "react";

function Tooltip() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white min-w-screen">
      {/* <div
        className="relative flex items-center text-gray-500 cursor-pointer hover:text-gray-600"
        x-data="{ hover: false }"
      >
        <p>Hover Me</p>
        <div className="relative">
          <div
            className="absolute bottom-0 inline-block w-64 px-4 py-3 mb-10 -ml-32 text-white bg-purple-600 rounded-lg"
            x-show="hover"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 transform scale-90"
            x-transition:enter-end="opacity-100 transform scale-100"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100 transform scale-100"
            x-transition:leave-end="opacity-0 transform scale-90"
            x-cloak
          >
            <span className="inline-block text-sm leading-tight">
              Hello, I'm a quick tooltip that you can drop into any project.
            </span>
            <span className="absolute bottom-0 right-0 w-5 h-5 -mb-1 transform rotate-45 bg-purple-600"></span>
          </div>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div> */}
    </div>
  );
}

export default Tooltip;

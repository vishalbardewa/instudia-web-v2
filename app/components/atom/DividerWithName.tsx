import React from 'react';

interface IDividerWithName {
  name: string;
}

export default function DividerWithName({ name }: IDividerWithName) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-start">
        <span className="bg-white pr-3 text-2xl font-medium text-gray-900">
          {name}
        </span>
      </div>
    </div>
  );
}

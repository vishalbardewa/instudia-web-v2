import React from "react";

function Badge({name, color}: any) {
  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
      <svg
        className={`h-1.5 w-1.5 ${color}`}
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      {name}
    </span>
  );
}

export const BasicBadge = () => <Badge name="Basic" color="fill-purple-500" />
export const FinanceBadge = () => <Badge name="Finance" color="fill-red-500" />
export const SkillBadge = () => <Badge name="Skill" color="fill-blue-500" />
export const DevelopmentBadge= () => <Badge name="Development" color="fill-yellow-500" />
export const DesignBadge= () => <Badge name="Design" color="fill-pink-500" />

export default Badge;

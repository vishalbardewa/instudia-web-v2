import React from "react";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        @keyframes page-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-enter {
          animation: page-fade-in 0.75s ease-in-out both;
        }
      `}</style>
      <div className="page-enter">{children}</div>
    </>
  );
}

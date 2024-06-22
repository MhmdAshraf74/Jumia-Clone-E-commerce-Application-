import React from "react";

export default function Category({ children }) {
  return (
    <div className="shadow-black">
      <div className="bg-white py-6 rounded">{children}</div>
    </div>
  );
}

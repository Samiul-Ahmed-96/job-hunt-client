import React from "react";

const Badge = ({ children, className }) => {
  return (
    <div
      className={`md:bg-primary/10 md:text-black sm:bg-primary font-light w-fit px-2 py-1 rounded-full sm:text-white text-primary text-sm ${className}`}
    >
      <p>{children}</p>
    </div>
  );
};

export default Badge;

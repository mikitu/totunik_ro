import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
  >
    {children}
  </button>
);
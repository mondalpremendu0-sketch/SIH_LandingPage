import { forwardRef } from "react";

export const Button = forwardRef(function Button(
  { children, className = "", variant = "primary", ...props },
  ref,
) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

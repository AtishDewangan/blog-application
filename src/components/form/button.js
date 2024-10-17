"use client";
export default function Button({
  label,
  onClick,
  type = "button",
  className,
  disabled,
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-white rounded ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
Button.defaultProps = {
  onClick: () => {},
  type: "button",
  className: "",
  disabled: false,
};

function AstraLogo({ size = 20, className = "", strokeWidth = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polygon
        points="36,94 306,12 241,281 158,325 112,215 13,180"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="13,180 25,172 218,108 158,325"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AstraLogo;


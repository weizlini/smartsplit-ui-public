export const Loader = ({ size, color }) => {
  const iconSize = size ? size : 28;
  const strokeColor = color ? color : "#2da84f";
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${iconSize} ${iconSize}`}
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};

export const PageLoader = ({ vHeight }) => {
  const vh = vHeight ? vHeight + "vh" : "100vh";
  return (
    <div
      style={{
        width: "100%",
        height: vh,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size={50} />
    </div>
  );
};

import { SVGProps } from "react";

const DoubleArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4v16m0 0-4-4m4 4 4-4m6-12v16m0-16 4 4m-4-4-4 4"
    />
  </svg>
);
export default DoubleArrow;

import React from "react";

type Props = {
  className?:string
};

function Landmark({className}: Props) {
  return (
    <svg
     className={className}
      width="61"
      height="61"
      viewBox="0 0 61 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6_88)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.7812 36.2188L11.4375 28.5938V5.71875C11.4375 4.20204 12.04 2.74746 13.1125 1.67498C14.185 0.602509 15.6395 0 17.1562 0L43.8438 0C45.3605 0 46.815 0.602509 47.8875 1.67498C48.96 2.74746 49.5625 4.20204 49.5625 5.71875V28.5938L36.2188 36.2188L30.5 33.3594L24.7812 36.2188ZM4.03744 13.8584L7.625 11.9446V26.2529L3.81398e-08 21.7808V20.5875C-0.00013819 19.2053 0.375458 17.849 1.08662 16.6637C1.79778 15.4784 2.81775 14.5088 4.03744 13.8584ZM61 21.7808L53.375 26.2529V11.9446L56.9626 13.8584C58.1823 14.5088 59.2022 15.4784 59.9134 16.6637C60.6245 17.849 61.0001 19.2053 61 20.5875V21.7808ZM61 26.2033L39.2954 38.9256L61 50.9807V26.1995V26.2033ZM30.5 38.3995L60.7751 55.2202C60.3633 56.8712 59.4112 58.337 58.0702 59.3843C56.7293 60.4316 55.0765 61.0004 53.375 61H7.625C5.9235 61.0004 4.27075 60.4316 2.92979 59.3843C1.58883 58.337 0.636701 56.8712 0.224938 55.2202L30.5 38.3995ZM3.81398e-08 50.9807L21.7046 38.9256L3.81398e-08 26.2033V50.9846V50.9807Z"
          fill="current"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_88">
          <rect width="61" height="61" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Landmark;
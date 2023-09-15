import React from "react";
import { LOCALES } from "../../common/constants";

interface ILanguageIcon {
  language: keyof typeof LOCALES;
}

const russian = () => (
  <>
    <g clipPath="url(#clip0_2576_11874)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.241211 0.369385H15.7585V12.1307H0.241211V0.369385Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.241211 4.28979H15.7585V12.1307H0.241211V4.28979Z"
        fill="#0039A6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.241211 8.21021H15.7585V12.1307H0.241211V8.21021Z"
        fill="#D52B1E"
      />
    </g>
    <defs>
      <clipPath id="clip0_2576_11874">
        <rect x="0.5" y="0.5" width="15" height="11.5" rx="4" fill="white" />
      </clipPath>
    </defs>
  </>
);

const english = () => (
  <>
    <g clipPath="url(#clip0_2576_1134)">
      <path
        d="M0.241211 2.36938L15.7585 2.36938V14.1307H0.241211L0.241211 2.36938Z"
        fill="#012169"
      />
      <path
        d="M2.05964 2.36938L7.97558 6.8044L13.8673 2.36938H15.7585V3.88856L9.93949 8.27457L15.7585 12.6361V14.1307H13.8188L7.99983 9.74474L2.20511 14.1307H0.241211L0.241211 12.6606L6.03593 8.29907L0.241211 3.93757L0.241211 2.36938H2.05964Z"
        fill="white"
      />
      <path
        d="M10.5214 9.25468L15.7585 13.1506V14.1307L9.18787 9.25468H10.5214ZM6.06018 9.74474L6.20565 10.6023L1.55048 14.1307H0.241211L6.06018 9.74474ZM15.7585 2.36938V2.44289L9.72127 7.04943L9.76977 5.9713L14.5462 2.36938H15.7585ZM0.241211 2.36938L6.03593 6.68188H4.58119L0.241211 3.3985L0.241211 2.36938Z"
        fill="#C8102E"
      />
      <path
        d="M6.08442 2.36938L6.08442 14.1307H9.96373V2.36938H6.08442ZM0.241211 6.28984L0.241211 10.2103H15.7585V6.28984L0.241211 6.28984Z"
        fill="white"
      />
      <path
        d="M0.241211 7.09843L0.241211 9.45071H15.7585V7.09843L0.241211 7.09843ZM6.86028 2.36938L6.86028 14.1307H9.18787V2.36938H6.86028Z"
        fill="#C8102E"
      />
    </g>
    <defs>
      <clipPath id="clip0_2576_1134">
        <rect x="0.5" y="2.5" width="15" height="11.5" rx="4" fill="white" />
      </clipPath>
    </defs>
  </>
);

export const LanguageIcon = (props: ILanguageIcon) => {
  const { language } = props;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 -1 16 16"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {language === "en" ? english() : russian()}
    </svg>
  );
};

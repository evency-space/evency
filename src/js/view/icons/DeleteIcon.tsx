import React, { FunctionComponent } from "react";
import { SVGprops } from "../../interfaces";

export const DeleteIcon: FunctionComponent<SVGprops> = (props) => {
  const { size, color = "white", fill = "none" } = props;
  return (
    <svg
      width={size.toString()}
      height={size.toString()}
      viewBox="0 0 32 32"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6127 5.0461L12.3957 6.33837C13.1438 6.31723 13.8919 6.30666 14.6399 6.30666C16.2969 6.30666 17.9556 6.3378 19.6139 6.3994L19.3863 5.05428C19.2748 4.37025 19.2042 4.12471 19.0747 3.97543C19.003 3.89282 18.7531 3.66669 17.7466 3.66669H14.2533C13.2318 3.66669 12.9896 3.88653 12.925 3.95977C12.8022 4.09904 12.7328 4.33304 12.6127 5.0461ZM10.6404 4.7144L10.3536 6.42235C9.10931 6.48951 7.86508 6.58593 6.62092 6.71158L3.90238 6.9781C3.35273 7.03199 2.95083 7.52125 3.00472 8.0709C3.05861 8.62055 3.54787 9.02244 4.09752 8.96856L6.81752 8.70189L6.82045 8.7016C9.42723 8.43829 12.0337 8.30666 14.6399 8.30666C19.0594 8.30666 23.4932 8.53161 27.9013 8.96845C28.4509 9.02292 28.9406 8.62154 28.9951 8.07194C29.0495 7.52235 28.6482 7.03267 28.0986 6.9782C25.9564 6.76591 23.8078 6.60291 21.6573 6.49069C21.6559 6.48041 21.6543 6.47013 21.6526 6.45983L21.3598 4.7295L21.3472 4.6519C21.2596 4.10676 21.1282 3.29036 20.5852 2.66462C19.9569 1.94055 18.9935 1.66669 17.7466 1.66669H14.2533C13.0214 1.66669 12.057 1.92018 11.4249 2.63694C10.8827 3.25185 10.748 4.06534 10.6562 4.61985L10.6404 4.7144ZM26.1312 12.2512C26.1668 11.7 25.7488 11.2244 25.1977 11.1888C24.6466 11.1532 24.1709 11.5712 24.1354 12.1223L23.2691 25.5435L23.2689 25.5462C23.2312 26.0832 23.1994 26.5092 23.1246 26.8803C23.0518 27.2419 22.9507 27.4793 22.8202 27.6493C22.5951 27.9423 22.0392 28.3334 20.2799 28.3334H11.7199C9.9607 28.3334 9.40478 27.9423 9.17968 27.6493C9.04915 27.4793 8.94807 27.2419 8.87526 26.8803C8.8005 26.5092 8.76866 26.0832 8.73103 25.5462L8.73083 25.5435L7.86454 12.1223C7.82896 11.5712 7.35334 11.1532 6.8022 11.1888C6.25106 11.2244 5.83311 11.7 5.86869 12.2512L6.73534 25.6778L6.7375 25.7086C6.77263 26.2103 6.81126 26.7619 6.91463 27.2752C7.02182 27.8074 7.21074 28.3692 7.59355 28.8675C8.39511 29.9111 9.75919 30.3334 11.7199 30.3334H20.2799C22.2407 30.3334 23.6048 29.9111 24.4063 28.8675C24.7892 28.3692 24.9781 27.8074 25.0853 27.2752C25.1886 26.7619 25.2273 26.2103 25.2624 25.7086L25.2642 25.6833L26.1312 12.2512Z"
        fill={color}
      />
    </svg>
  );
};
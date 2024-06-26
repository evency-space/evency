import React from "react";
import { IPageWrapperProps } from "./PageWrapperProps";
import { Loader } from "../../elements";
import { classesOf } from "../../../utils";
import { useLoading } from "../../../hooks";

export const PageWrapper = (props: IPageWrapperProps) => {
  const {
    pageContent,
    pageFooter,
    className = "",
    verticalTopPageContent = false,
  } = props;

  const { loading } = useLoading();

  const pageWrapperClasses = classesOf(
    "h-full w-full flex flex-col grow items-stretch",
    className,
  );

  const pageContentClasses = classesOf(
    "flex grow justify-center bg-light-4 dark:bg-black-0",
    verticalTopPageContent && "items-start",
    !verticalTopPageContent && "items-center",
  );

  return (
    <>
      {loading && <Loader />}

      <div className={pageWrapperClasses}>
        <div className={pageContentClasses}>{pageContent}</div>
        {pageFooter}
      </div>
    </>
  );
};

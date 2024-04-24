import React, { useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header/Header";
import "../../../../styles/index.css";
import "../../../../styles/toast.css";
import { useDarkMode, useModal } from "../../../hooks";

export function App() {
  const modalContext = useModal();
  const location = useLocation();

  useDarkMode();

  useEffect(() => {
    if (modalContext.content) {
      // drop context for modals
      modalContext.setContent(undefined);
    }
  }, [location]);

  return (
    <>
      <ToastContainer
        transition={Slide}
        autoClose={2000}
        closeButton={false}
        closeOnClick
        hideProgressBar
        position="top-center"
      />

      <div className="relative h-full bg-light-4 dark:bg-black-0 px-base overflow-y-auto">
        <div className="h-full max-w-[1024px] m-auto">
          <Header />

          <main className="flex h-[calc(100%-theme(height.header))]">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

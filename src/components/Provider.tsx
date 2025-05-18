"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
export default function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        className={"z-[100]"}
      />
      <NextTopLoader
        color="#2563eb"
        height={3}
        showSpinner={false}
        shadow="0 0 10px #2563eb,0 0 5px #2563eb"
      />
      {children}
    </>
  );
}

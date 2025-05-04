"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
export default function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        className={"z-[100]"}
      />
      <NextTopLoader />
      {children}
    </>
  );
}

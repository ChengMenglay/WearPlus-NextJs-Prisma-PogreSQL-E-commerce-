import React, { ReactNode } from "react";
import ProfileSidebar from "./ProfileSidebar";
export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container grid grid-rows-12 md:grid-cols-12 px-4 mx-auto h-[80vh] gap-4 mt-4">
      <div className="row-span-2 lg:col-span-2 md:col-span-4 overflow-x-auto md:overflow-visible">
        <ProfileSidebar />
      </div>
      <div className="row-span-10 lg:col-span-10 md:col-span-8">{children}</div>
    </div>
  );
}
